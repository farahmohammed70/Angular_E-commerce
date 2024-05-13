This repository holds the source code for a full-fledged e-commerce application built with Angular. It allows users to browse products, manage shopping carts and place orders. Additionally, it offers admin features such as managing brands, categories, products, and users through Admin Dashboard.

Features:

-User Management: Registration, login, profile updates with authentication and authorization functionalities using a backend API.
-Product Management: Browse, filter, view product details, with features like brands, categories, sub-categories, and images (data fetched from a Node.js backend).
-Order Management: Place orders, view order history, manage order status (optional for admin, dependent on backend implementation).
-Review Management: Users can leave reviews on products (optional for admin moderation, dependent on backend implementation).
-Shopping Cart: Add, remove, and manage items in the shopping cart, with functionality dependent on backend integration or local storage for simplified demo purposes.
-Error Handling: Robust error handling with informative user messages.
-Validation: Form validation ensures data integrity before sending requests to the backend API.

Project Structure:

-app: Main Angular application module containing components, services, and other application logic.
-components: Reusable UI elements for product listings, shopping cart, user profile, etc.
-services: Data access services that interact with the backend API (or mock services for local development).
-shared: Shared modules containing components, directives, and pipes used across the application.
-assets: Stores images, fonts, and other static resources.
-environments: Configuration files for development, testing, and production environments.
-styles.css: Global styles for the application.
-index.html: The root HTML file for the Angular application.
-main.ts: The main entry point of the Angular application.

Running the Project (Prerequisites):

-Node.js and npm (or yarn): Ensure you have Node.js and npm (or yarn) installed on your system.
-Angular CLI: Make sure you have the Angular CLI installed globally: npm install -g @angular/cli
-Backend API (Optional): If using a separate backend API, set up the server and configure API endpoints. Otherwise, configure mock services for local development.
-Install Dependencies: Run npm install (or yarn install) in the project root directory to install dependencies.
-Start the Development Server: Run ng serve to start the development server and access the application at http://localhost:4200 (default port).

Additional Information:

-This project can be connected to a backend for data persistence, authentication, and authorization. Alternatively, local mock services can be used for a simplified development experience.
-Robust error handling ensures a user-friendly experience.
-Form validation safeguards data integrity before sending requests to the backend API (or handling locally for a simplified demo).