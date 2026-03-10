# Inventory Tracking System

A real-time inventory management application built with React and Firebase. This system allows users to track stock levels, add new products, update existing details, and remove items from the inventory. It features real-time synchronization and low-stock alerts.

## Features

- **Real-time Inventory Management:**
  - **Live Updates:** Inventory changes are instantly reflected across all connected clients using Firebase Realtime Database.
  - **View Inventory:** Display product details including name, category, price, and current stock.
- **Product Operations (CRUD):**
  - **Add Product:** Create new inventory items with essential details.
  - **Edit Product:** Update product information and stock levels.
  - **Delete Product:** Remove discontinued items from the system.
- **Stock Monitoring:**
  - **Low Stock Alerts:** Visual indicators highlight products with stock levels below a defined threshold.
- **Responsive UI:**
  - Clean and modern interface built with Tailwind CSS.
  - Modal-based forms for a seamless user experience.

## Tech Stack

 - **Frontend:** React.js (Vite)
 - **State Management:** Redux Toolkit
 - **Backend:** Firebase Realtime Database
 - **Styling:** Tailwind CSS

## Installation and Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js installed on your machine.
- A Firebase project with Realtime Database enabled.

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MokshPShah/React-Js
    cd Inventory-Tracking-System
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Firebase:**
    - Create a `.env` file in the root directory.
    - Add your Firebase configuration keys as follows:
      ```env
      VITE_API_KEY=your_api_key
      VITE_AUTH=your_auth_domain
      VITE_PROJECT=your_project_id
      VITE_STORAGE=your_storage_bucket
      VITE_SENDER_ID=your_messaging_sender_id
      VITE_APP_ID=your_app_id
      ```

4.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    The app should be running at `http://localhost:5173`.
