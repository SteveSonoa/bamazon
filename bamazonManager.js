var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./constructors/keys.js');

// Display options of "View Products For Sale", "View Low Inventory", "Add To Inventory", and "Add New Product"
// View Products For Sale
	// Display all available items, including itemID, name, price, quantity
// View Low Inventory
	// List all items (identical to View Products For Sale) with quantity less than 5
// Add To Inventory
	// Inquirer list all items (name | qty)
	// Select an item to add qty to
	// Input how many to add
	// Update MySQL
// Add New Product
	// Input name (validate length)
	// Input description (validate length)
	// Input price (validate double)
	// Input qty (validate integer)
	// Update MySQL

// * Create a new Node application called `bamazonManager.js`. Running this application will:
//   * List a set of menu options:
//     * View Products for Sale
//     * View Low Inventory
//     * Add to Inventory
//     * Add New Product
//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

function listOptions() {
	// query the database for all items with at least 1 in stock
	connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, results) {
		if (err) throw err;
		// once you have the items, prompt the user for which they'd like to buy
		inquirer.prompt([
			{
				name: "choice",
				type: "list",
				choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Quit"],
				message: "What would you like to do?"
			}
		])
		.then(function(answer) {
			if(answer.choice === "View Products Fo Sale") {
				viewProducts();
			}
			else if(answer.choice === "View Low Inventory") {
				// viewLowInventory();
			}
			else if(answer.choice === "Add To Inventory") {
				// addInventory();
			}
			else if(answer.choice === "Add New Product") {
				// addNewProduct();
			}
			else {
				console.log("Have a nice day!");
				connection.end();
			}
		});
	});
}

function viewProducts() {
	// console.log("Selecting all products...\n");
	connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
		if (err) throw err;
		// Log all results of the SELECT statement
		console.log("+----+------------------------------------------+------------------+----------+-----+");
		console.log("|  # | NAME                                     | DEPARTMENT       | PRICE    | QTY |");
		console.log("+----+------------------------------------------+------------------+----------+-----+");
		for (let i = 0; i < res.length; i++) {
			let item_id = res[i].item_id.toString();
			let product_name = res[i].product_name;
			let department_name = res[i].department_name;
			let price = "$" + res[i].price;
			let stock_quantity = res[i].stock_quantity.toString();
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