var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./constructors/keys.js');

connection.connect(function(err){
	// console.log("Connected as ID: " + connection.threadId);
	// Display table of items available with id, name, & price where quantity > 0
	readProducts();

	userOptions = [];
	// Display inquirer of all items with quantity > 0
	connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
		if(err) throw err;
		for (let i = 0; i < res.length; i++) {
			userOptions.push(res[i].product_name);
		}

		// Inquirer prompt with all selected items in a list
		inquirer.prompt([
		{
			type: "list",
			message: "What would you like to purchase?",
			choices: userOptions,
			name: "choice"
		},
		// User to input how many of each item wanted
		{
			type: "input",
			message: "How many of these would you like to purchase?",
			name: "quantity",
			// Ensure a number is entered
			validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
		}
		]).then(function(answers) {
			connection.query("SELECT * FROM products WHERE product_name = " + answers.choice, function(err2, res2) {
				if(err2) throw err2;
				// If # purchased > quantity, deny it
				if(answers.quantity > res2.stock_quantity) {
					console.log("I'm sorry; we only have " + res2.stock_quantity + " of those in stock.");
				}
				// Else purchase it
				else {
					// Update MySQL quantities
					// Provide user with total price

				}
			});
		});
	});
});

function readProducts() {
	// console.log("Selecting all products...\n");
	connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
		if (err) throw err;
		// Log all results of the SELECT statement
		console.log("+----+------------------------------------------+------------------+----------+");
		console.log("|  # | NAME                                     | DEPARTMENT       | PRICE    |");
		console.log("+----+------------------------------------------+------------------+----------+");
		for (let i = 0; i < res.length; i++) {
			let item_id = res[i].item_id.toString();
			let product_name = res[i].product_name;
			let department_name = res[i].department_name;
			let price = "$" + res[i].price;
			while(item_id.length < 2) {
				item_id = " " + item_id;
			}
			while(product_name.length < 40) {
				product_name = product_name + " ";
			}
			while(department_name.length < 16) {
				department_name = department_name + " ";
			}
			while(price.length < 8) {
				price = " " + price;
			}
			console.log("| " + item_id + " | " + product_name + " | " + department_name + " | " + price + " |");
		}
		console.log("+----+------------------------------------------+------------------+----------+");
		connection.end();
	});
}
