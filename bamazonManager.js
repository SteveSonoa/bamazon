var mysql = require('mysql');
var inquirer = require('inquirer');

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