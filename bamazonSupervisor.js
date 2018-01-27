var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./constructors/keys.js');

// 4. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:
//    * View Product Sales by Department
//    * Create New Department
// 5. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |
// 6. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.
// 7. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.
//    * Hint: You may need to look into aliases in MySQL.
//    * Hint: You may need to look into GROUP BYs.
//    * Hint: You may need to look into JOINS.

listOptions();

function listOptions() {
	// Display options of "View Products For Sale", "View Low Inventory", "Add To Inventory", and "Add New Product"
	inquirer.prompt([
		{
			name: "choice",
			type: "list",
			choices: ["View Product Sales By Department", "Create New Department", "Quit"],
			message: "What would you like to do?"
		}
	])
	.then(function(answer) {
		if(answer.choice === "View Product Sales By Department") {
			// viewProductSales();
		}
		else if(answer.choice === "Create New Department") {
			// createDepartment();
		}
		else {
			console.log("Have a nice day!");
			connection.end();
		}
	});
}

// View Products For Sale -- AND -- View Low Inventory
function viewProductSales() {
	var q = "SELECT * FROM products";
	// If a true value was passed, view just the low inventory instead of all of it
	if(low) {
		q = "SELECT * FROM products WHERE stock_quantity < 5";
	}
	connection.query(q, function(err, res) {
		if (err) throw err;
		// Log all results of the SELECT statement
		console.log("+----+------------------------------------------+------------------+----------+-----+");
		console.log("|  # | NAME                                     | DEPARTMENT       | PRICE    | QTY |");
		console.log("+----+------------------------------------------+------------------+----------+-----+");
		// Display all available items, including itemID, name, price, quantity
		for (let i = 0; i < res.length; i++) {
			let item_id = res[i].item_id.toString();
			let product_name = res[i].product_name;
			let department_name = res[i].department_name;
			let price = "$" + res[i].price;
			let stock_quantity = res[i].stock_quantity.toString();
			// Update the temp strings by including white space. This will size the tables correctly.
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
			while(stock_quantity.length < 3) {
				stock_quantity = " " + stock_quantity;
			}
			console.log("| " + item_id + " | " + product_name + " | " + department_name + " | " + price + " | " + stock_quantity + " |");
		}
		console.log("+----+------------------------------------------+------------------+----------+-----+\n");
		listOptions();
	});
}

// Add New Product
function createDepartment() {
	// Input name (validate length)
	// Input description (validate length)
	// Input price (validate double)
	// Input qty (validate integer)
	// Update MySQL
	inquirer.prompt([
		{
			name: "product_name",
			type: "input",
			message: "What is the name of the new department?"
		},
		{
			name: "price",
			type: "input",
			message: "What is the overhead of this department? (Please only input a number.)",
			validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
		}
	])
	.then(function(answer) {
		connection.query(
			"INSERT INTO departments (department_name, overhead_costs) VALUES ('" + answer.department_name + "', '" + answer.overhead_costs + "')",
			function(error) {
				if (error) {
					console.log(error);
					throw error;
				}
				console.log("You have added " + answer.stock_quantity + " units of " + answer.product_name + ".");
				listOptions();
			}
		);
	});

}

