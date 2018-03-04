# bamazon
amazon in bash

What is this?

This application offers three different command-line interfaces for inventory control and purchasing.

setup:
after cloning the repository, run npm install.
You will need to create your own database connection and update the javascript files to use the correct connection information.
Run SetupDB.sql to create the tables and sample data prior to running the customer, manager, or supervisor javascript files.

Customer interface:
to launch:
node bamazonCustomer.js

See the screenshots for examples. The user can enter a product and quantity to purchase and the application will update the stock and sales.

Manager interface:

to launch:
node bamazonManager.js

See the screenshots for examples. The user is presented with a list of options to view and manage inventory.

Supervisor interface:

to launch:
node bamazonSupervisor.js

See the screenshots for examples. The user can view total sales by department and add a new department to the database.
