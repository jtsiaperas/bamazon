var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "MySQLPassword1!",
  database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    supervisorInterface();
});

function supervisorInterface(){
	inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Product Sales by Department",
        "Add New Department",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          listProductSales();
          break;

        case "Add New Department":
          addDepartment();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function listProductSales() {
    var query = "select department_id, departments.department_name, sum(products.product_sales) as product_sales, over_head_costs, product_sales - over_head_costs as total_profit from departments inner join products on departments.department_name = products.department_name group by departments.department_name";
	connection.query(query, function(err, res) {
        console.log("| department_id | department_name | product_sales | over_head_costs | total_profit |");
        for (var i = 0; i < res.length; i++) {
            var id = res[i].department_id;
            var diff = 13-id.length
            for (var j = 0; j<diff; j++)
            {
                id += " ";
            }
            var name = res[i].department_name;
            diff = 15-name.length;
            for (var j = 0; j<diff; j++)
            {
                name += " ";
            }
            var sales = res[i].product_sales.toString();
            diff = 13-sales.length;
            for (var j = 0; j<diff; j++)
            {
                sales += " ";
            }
            var costs = res[i].over_head_costs.toString();
            diff = 15-costs.length;
            for (var j = 0; j<diff; j++)
            {
                costs += " ";
            }
            var profit = res[i].total_profit.toString();
            diff = 12-profit.length;
            for (var j = 0; j<diff; j++)
            {
                profit += " ";
            }
            console.log(`| ${id} | ${name} | ${sales} | ${costs} | ${profit} |`);
        }

        supervisorInterface();
    });
}

function addDepartment(){
    
	inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "Please type the department ID."
    },{
        name: "name",
        type: "input",
        message: "Please type the department name."
    },{
        name: "costs",
        type: "input",
        message: "Please type the overhead costs."
    }])
    .then(function(answer){

        var query = "insert into departments (department_id, department_name, over_head_costs) values (?,?,?)";
	    var inserts = [answer.id, answer.name, answer.costs];
	    query = mysql.format(query,inserts);
	    connection.query(query, function(err,res){
        if (err) throw err;
        console.log("New department added.");
        supervisorInterface();
        });
    });
}