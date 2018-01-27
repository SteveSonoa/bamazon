var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./constructors/keys.js');

listOptions();

function listOptions() {
	// Display options of "View Product Sales By Department", "Create New Department", and "Quit"
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
			createDepartment();
		}
		else {
			console.log("Have a nice day!\n");
			connection.end();
		}
	});
}

// View Product Sales By Department
function viewProductSales() {
// 6. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.
// 7. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.
//    * Hint: You may need to look into aliases in MySQL.
//    * Hint: You may need to look into GROUP BYs.
//    * Hint: You may need to look into JOINS.

	// 5. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
	// | department_id | department_name | over_head_costs | product_sales | total_profit |
	// | ------------- | --------------- | --------------- | ------------- | ------------ |
	// | 01            | Electronics     | 10000           | 20000         | 10000        |
	// | 02            | Clothing        | 60000           | 100000        | 40000        |
	var q = "SELECT * FROM departments";
	connection.query(q, function(err, res) {
		if (err) throw err;
		console.log("+----+-----------------------------+----------------+---------------+--------------+");
		console.log("| ID | DEPARTMENT NAME             | OVERHEAD COSTS | PRODUCT SALES | TOTAL PROFIT |");
		console.log("+----+-----------------------------+----------------+---------------+--------------+");
		// Display all available items, including itemID, name, price, quantity
		for (let i = 0; i < res.length; i++) {
			let department_id = res[i].department_id.toString();
			let department_name = res[i].department_name;
			let overhead_costs = "$" + res[i].overhead_costs.toString();
			let product_sales = res[i].product_sales.toString();
			let total_profit = parseInt(res[i].product_sales) - parseInt(res[i].overhead_costs);
			// Update the temp strings by including white space. This will size the tables correctly.
			while(department_id.length < 2) {
				department_id = " " + department_id;
			}
			while(department_name.length < 27) {
				department_name = department_name + " ";
			}
			while(overhead_costs.length < 14) {
				price = " " + price;
			}
			while(stock_quantity.length < 3) {
				stock_quantity = " " + stock_quantity;
			}
			console.log("| " + department_id + " | " + department_name + " | " + overhead_costs + " | " + product_sales + " | " + total_profit + " |");
		}
		console.log("+----+-----------------------------+----------------+---------------+--------------+\n");
		listOptions();
	});
}

// Add New Product
function createDepartment() {
	inquirer.prompt([
		{
			name: "department_name",
			type: "input",
			message: "What is the name of the new department?"
		},
		{
			name: "overhead_costs",
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
				console.log("You have added a " + answer.department_name + " department with an overhead cost of $" + answer.overhead_costs + ".\n");
				listOptions();
			}
		);
	});

}

