# Goal:

To display the provided product data within a grid and apply the filtering options.

# Instructions:

- How to run this app. run:
  - npm install
  - run the following commands in its own terminal and leave them running
    - npm run watch
    - npm run server
  - open http://localhost:3000/

- Please use Git to commit your changes

- You can use any third party library to complete the task.

- It is recommended to change the project to use the framework of your choice. Anything is acceptable, Angular, React, JQuery etc
  - Feel free to completely change app.js this provides an example of loading products from the express server

- Given the provided project complete the following instructions.

- Hook up the search input box to filter down products.
	- The search should match using the name, description and brand properties.
	- The search should not fire unless a minimum of three characters have been typed.
	- The search should only fire a maximum of once per 400 milliseconds.

- Hook up the brand filter drop down.
	- A list of unique brands should be populated as options.  These should be populated from the brand property from the collection of products in the grid and only needs to be populated once.
	- Selecting a brand from the drop down should update the grid and show only products with the selected matching brand.

- Hook up the stock filter.
	- Selecting All should show all products regardless of quantity number. (Default)
	- Selecting In Stock should show only products that have a quantity higher than zero.
	- Selecting Out of Stock should show only products that have a quantity of zero.

- All filters should be inclusive.
	- If searching for “shoe” with the brand selected as “Nike” and In Stock, then only products matching all three filters should be shown in the grid.

- When returning your code, please remove node_modules and any build files, zip it and mention your favourite movie or tv show in your email.
