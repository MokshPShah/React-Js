# Product Management App

A React-based web application for managing products. This application allows users to view, add, update, and delete products. It includes features for sorting, searching, and filtering products, as well as user authentication to restrict access to certain operations.

## Features

- **Product Management (CRUD):**
  - **Create:** Add new products with details like title, price, image, and category.
  - **Read:** View a dynamic list of products fetched from a backend.
  - **Update:** Edit existing product details.
  - **Delete:** Remove products from the inventory.
- **Search, Sort, & Filter:**
  - **Search:** Find products by title.
  - **Sort:** Sort products by price (Low to High, High to Low).
  - **Filter:** Filter products by category.
- **Authentication:**
  - Simple user authentication mechanism.
  - Protected routes (Private Routes) to restrict access to product management features.
- **Responsive UI:**
  - Built with Bootstrap for a responsive and visually appealing design.
  - Navigation bar for easy access to different sections.

## Tech Stack

- **Frontend:** React.js
- **State Management:** Redux, React-Redux, Redux-Thunk
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Backend (Mock):** JSON Server

## Component Structure

The application is built using the following key components:

- `Navbar`: Navigation bar with links to Product List, Add Product, and Sign Out.
- `ProductList`: Displays the list of products with options to sort, search, and filter.
- `ProductItem`: Represents a single product card with Edit and Delete options.
- `ProductForm`: Form for adding and updating products with validation.
- `PrivateRoute`: Higher-order component to protect routes requiring authentication.

## Installation and Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js installed on your machine.

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MokshPShah/React-Js
    cd product-management-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install `react-router-dom`, `redux`, `react-redux`, `redux-thunk`, `bootstrap`, `json-server`, and other necessary packages.

3.  **Set up the JSON Server:**
    The project uses `json-server` to mock a backend API. Ensure you have a `db.json` file in the root or specified directory with initial product data.

    To start the JSON server (usually on port 3001 or 5000 to avoid conflict with React's 3000):
    ```bash
    npx json-server --watch db.json --port 3001
    ```

4.  **Start the React Application:**
    Open a new terminal window and run:
    ```bash
    npm start
    ```
    The app should open in your browser at `http://localhost:5173`.