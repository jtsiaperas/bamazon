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
    managerInterface();
});

function managerInterface(){
	inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          var query = "select * from products order by department_name";
          listProducts(query);
          break;

        case "View Low Inventory":
          var query = "select * from products where stock_quantity < 5 order by department_name";
          listProducts(query);
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function listProducts(query) {
	
	connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          var id = res[i].item_id; 
          var name = res[i].product_name;
          var times = 30-name.length;
          for (var j = 0; j<times; j++)
          {
              name += " ";
          }
          var price = res[i].price.toString();
          times = 10-price.length;
          for (var j = 0; j<times; j++)
          {
              price += " ";
          }
          var quantity = res[i].stock_quantity;
          console.log(`ID: ${id} | Item: ${name} | Price: $${price} | Quantity: ${quantity}`);
        }

        managerInterface();
    });
}

function addInventory(){
	
	inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "Please type the ID of the product you wish to purchase."
    },{
        name: "quantity",
        type: "input",
        message: "Please type how many you wish to add."
    }])
    .then(function(answer){

    	var query = "select * from products where ??=?";
    	var inserts = ["item_id",answer.id];
    	var total;
    	query = mysql.format(query,inserts);
        connection.query(query, function(err,res){
        	if (err) throw err;
            updateQuantity(res[0],answer.quantity);
            managerInterface();  
        });

    });

}

function updateQuantity(item,quantity,flag)
{
	var newTotal;
	if (flag == "subtract")
	{
        newTotal = item.stock_quantity - quantity;
	}
	else
	{
		newTotal = parseInt(item.stock_quantity) + parseInt(quantity);
	}

	var query = "update products set ??=? where ??=?";
	var inserts = ["stock_quantity",newTotal,"item_id",item.item_id];
	query = mysql.format(query,inserts);
	connection.query(query, function(err,res){
        if (err) throw err;
    });

}   