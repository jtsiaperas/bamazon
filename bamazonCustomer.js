
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
    listProducts();
    
   
});

function listProducts() {
	var query = "select * from products order by department_name";
	connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          var id = res[i].item_id; 
          var name = res[i].product_name;
          var times = 30-name.length;
          for (var j = 0; j<times; j++)
          {
              name += " ";
          }
          var price = res[i].price;
          console.log(`ID: ${id} | Item: ${name} | Price: $${price}`);
        }
        customerInterface();
    });
}



function customerInterface(){
	
	inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "Please type the ID of the product you wish to purchase."
    },{
        name: "quantity",
        type: "input",
        message: "Please type how many you wish to purchase."
    }])
    .then(function(answer){

    	var query = "select * from products where ??=?";
    	var inserts = ["item_id",answer.id];
    	var total;
    	query = mysql.format(query,inserts);
        connection.query(query, function(err,res){
        	if (err) throw err;
            if(res[0].stock_quantity > answer.quantity)
            {
                total = answer.quantity * res[0].price;
                updateQuantity(res[0],answer.quantity,"subtract");
                console.log(`Your order total is $${total}`);
            }
            else if (res[0].stock_quantity < answer.quantity)
            {
            	console.log("Insufficient quantity!");
            }
            listProducts();  
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
		newTotal = item.stock_quantity + quantity;
	}

	var query = "update products set ??=? where ??=?";
	var inserts = ["stock_quantity",newTotal,"item_id",item.item_id];
	query = mysql.format(query,inserts);
	connection.query(query, function(err,res){
        if (err) throw err;
    });

}   

