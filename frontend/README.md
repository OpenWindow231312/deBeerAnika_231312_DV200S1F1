# FactFork - Product Comparison App

## Overview

**FactFork** is a product comparison app that allows users to compare two products based on their nutritional values. The app allows users to search for products, view key product details, and compare attributes such as calories, fat, protein, and more. The data is retrieved from the [Open Food Facts API](https://world.openfoodfacts.org/), and various charts (bar charts, pie charts, and radar charts) are used to display nutritional information.

## Features

- **Product Search**: Allows users to search for products.
- **Product Comparison**: Compare two products side by side.
- **Nutritional Insights**: Displays charts for calories, fat, sugar, protein, and other nutritional data.
- **Local Storage**: Stores selected products in local storage for persistence across sessions.
- **Dynamic Visualization**: Uses dynamic charts (BarChart, PieChart, RadarChart) to visualize product comparison.

## Technologies Used

- **React.js**: Front-end library to build user interfaces.
- **React Router**: For routing between different pages (if applicable).
- **Axios**: For making API requests.
- **Chart.js**: For data visualization (Bar, Pie, and Radar charts).
- **CSS**: For styling and layout.
- **React Suspense and Lazy Loading**: For efficient loading of chart components.
- **Local Storage**: For storing user-selected products.
- **Open Food Facts API**: For fetching product data.

## API Documentation

The app uses the [Open Food Facts API](https://world.openfoodfacts.org/) to fetch product nutritional information.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** (Node package manager)

### Clone the Repository

```bash
git clone https://github.com/OpenWindow231312/deBeerAnika_231312_DV200S1F1.git
cd deBeerAnika_231312_DV200S1F1

Install Dependencies

Run the following command to install the necessary dependencies:

npm install

Development

Run the Application Locally

Once dependencies are installed, run the app in development mode:

npm start

The application will be accessible at http://localhost:3000.

Building the App

To create a production build of the app, run:

npm run build

This will generate a build directory with the production-optimized version of your app.

Usage
	1.	Search for Products: Use the search bar to find products by name.
	2.	Select Products to Compare: After selecting two products, their nutritional information will be displayed side by side.
	3.	View Nutritional Charts: The comparison data will be visualized in bar charts, pie charts, and radar charts.
	4.	Compare Meta Data: Quantity and category information will be displayed for each product.

Structure

/src
  /components
    - BarChartCompare.js
    - PieChart.js
    - RadarChartCompare.js
    - WidgetHeaderCompare.js
    - Searchbar.js
    - SkeletonLoader.js
  /pages
    - Compare.js
    - Timeline.js
  /styles
    - Compare.css
    - Timeline.css
  /assets
    - Vegcolours.svg
  App.js
  index.js
  package.json
  README.md

Contributing

We welcome contributions! If you’d like to improve this app or fix bugs, please fork the repository and submit a pull request. Be sure to follow the project’s code of conduct and include detailed descriptions of any changes.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Author

This project was created by Anika de Beer, student number 231312, at Open Window Institute.