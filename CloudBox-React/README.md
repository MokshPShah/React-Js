# DocuVault (CloudBox)

A secure digital document management system built with React and Firebase. This application allows users to upload, view, categorize, and manage their personal, academic, and office documents in a secure cloud environment.

## Features

- **Document Management:**
  - **Upload:** Securely upload files (images, PDFs, etc.) with size validation (max 2MB).
  - **View:** Organize and view documents in a grid layout with visual previews.
  - **Edit:** Update document details such as name, category, description, or replace the file itself.
  - **Delete:** Remove unwanted documents from the vault.
  - **Download:** Easy access to download your stored files.
- **Categorization:**
  - Automatic organization into categories: Personal, Academic, Office, and Certificates.
- **Responsive UI:**
  - Modern, clean interface built with Tailwind CSS for optimal user experience across devices.

## Tech Stack

 - **Frontend:** React.js (Vite)
 - **State Management:** Redux Toolkit
 - **Backend/Database:** Firebase Realtime Database
 - **Styling:** Tailwind CSS

## Installation and Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js installed on your machine.
- A Firebase project configured with Realtime Database.

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MokshPShah/React-Js
    cd CloudBox-React
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Firebase:**
    - Create a `.env` file in the root directory of the project.
    - Add your Firebase configuration credentials as follows:
      ```env
      VITE_FIREBASE_API_KEY=your_api_key
      VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
      VITE_FIREBASE_DB_URL=your_database_url
      VITE_FIREBASE_PROJECT_ID=your_project_id
      VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
      VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
      VITE_FIREBASE_APP_ID=your_app_id
      ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will start at `http://localhost:5173`.
