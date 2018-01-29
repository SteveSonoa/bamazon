# An Introduction to Bamazon
Welcome to Bamazon! Please have a look around and shop to your heart's content! Managers, we've included functions for you to view low inventory items and restock, plus you can put new items on your shelves! Supervisors, review your P&L reports for each department and open entire new areas of the store by creating new departments.

### How does it work?
Bamazon uses nodeJS and functions under a CLI-only; there is no deployment or GUI. It uses a series of MySQL calls to manage the localhost database, update records, join tables, and calculate additional data in real-time. User input is handled by the Inquirer node package; database calls are handled by the MySQL node package.

### Who will use this?
Users who enjoy online shopping will find it easy to browse and find what they're looking for. Managers and supervisors have additional tools at their disposal to review store activities. This would be used by an online retail marketplace owner.

### What is the goal?
The primary goal is familiarity with MySQL. The minimum requirements included putting together a customer interface. Additional options were to create a manager function and supervisor area, where additional joins and real-time calculations would be required to display additional data.

# Deployment
Node is required to run this app. After downloading the repository, run `npm install` from the command line to ensure you have the necessary packages (mysql & inquirer).

You will also need to setup a MySQL database on your localhost and update `constructors/keys.js` to include your local password information. You may use the following SQL:

```
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
product_id INTEGER NOT NULL auto_increment PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DOUBLE NOT NULL,
stock_quantity INTEGER NOT NULL DEFAULT '0',
product_sales DOUBLE NOT NULL DEFAULT '0'
);

CREATE TABLE departments (
department_id INTEGER NOT NULL auto_increment PRIMARY KEY,
department_name VARCHAR(30) NOT NULL,
overhead_costs DOUBLE NOT NULL DEFAULT '0'
);

```

When that's complete, simply run `node bamazonCustomer` from the main directory to shop as a customer. Run `node bamazonManager` to see the manager functions, and run `node bamazonSupervisor` to see the supervisor functions. You will need to populate the tabes with data; begin by creating departments with bamazonSupervisor, then add new products from bamazonManager.

# Video Overview
[![Youtube Overview Video](http://www.fullstacksteve.com/wp-content/uploads/2018/01/bamazon-hero.png)](https://www.youtube.com/watch?v=Jq4fv3W_uTg)

# Credits
Steve Marshall, sole developer
* [Steve's Online Portfolio](http://fullstacksteve.com/)
* [Steve's LinkedIn Profile](https://www.linkedin.com/in/sonoa/)