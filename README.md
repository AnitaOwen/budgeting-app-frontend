# Budgeting App

## Introduction

Welcome to the **Budgeting App** – your go-to tool for taking control of your finances and achieving your financial goals!

No more juggling spreadsheets or struggling to keep track of expenses. The **Budgeting App** simplifies your financial journey by providing a clear view of your income, expenses, and savings. With intuitive features like tracking transactions, calculating disposable income, and visualizing your spending habits, the **Budgeting App** empowers you to make smarter financial decisions.

But that’s not all – gain actionable insights into your budget with detailed category breakdowns, allowing you to allocate resources effectively. Whether you're saving for a goal, cutting down on unnecessary spending, or just want to stay on top of your finances, the **Budgeting App** is here to help.

Take charge of your financial future today!

- [budgeting-app-frontend Github Repo](https://github.com/AnitaOwen/budgeting-app-frontend)
- [Deployed Netlify Link](https://clinquant-rolypoly-ea3737.netlify.app)
- [budgeting-app-backend Github Repo](https://github.com/AnitaOwen/budgeting-app-backend)
- [Deployed Render Link](https://budgeting-app-backend-bgr1.onrender.com)

## Getting Started

To set up and run the **Budgeting App** on your local machine, follow these steps:

### Backend Setup

1. **Clone the Backend Repository**: Fork and clone the backend repository to your local machine.

    ```bash
    git clone https://github.com/AnitaOwen/budgeting-app-backend
    ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.

    ```bash
    cd budgeting-app-backend
    npm install
    ```

3. **Install PostgreSQL**: 
   Make sure PostgreSQL is installed on your machine. You can download and install it from [PostgreSQL Official Website](https://www.postgresql.org/download/).

4. **Create a Database**:
   Open your terminal or PostgreSQL shell and run the following command to create a new database:
    ```bash
    CREATE DATABASE budgeting_app;
    ```
5. **Create a .env File**: In the root of the project, create a .env file and add your database credentials like so:
    ```
    PG_HOST=localhost
    PG_PORT=5432
    PG_DATABASE=budgeting_app
    PG_USER=your_username
    PG_PASSWORD=your_password
    ```
6. **Install Dependencies**: If you haven’t already, install the required project dependencies:
    ```bash
    npm install
    ```
7. **Seed the Database**: You need to initialize and seed the database with sample data. Run the following commands:
    ```bash
    npm run db:init   # Initializes the database structure
    npm run db:seed   # Seeds the database with initial data
    ```
8. **Run the Backend Server**: Start the backend server to interact with the database and the API:
    ```bash
    npm run dev
    ```
    
### Frontend Setup

To set up and run the **Budgeting App** frontend on your local machine, follow these steps:

1. **Clone the Frontend Repository**: Fork and clone the frontend repository to your local machine.

    ```bash
    git clone https://github.com/AnitaOwen/budgeting-app-frontend
    ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.

    ```bash
    cd budgeting-app-frontend
    npm install
    ```

3. **Run the Frontend Application**: Start the frontend development server to run the application locally.

    ```bash
    npm run dev
    ```

4. **Access the App**: Open your web browser and go to [http://localhost:3000/](http://localhost:3000/) to access the **Budgeting App**.

Now you’re ready to manage your finances with ease!

## Contributing

We welcome contributions to improve and expand the **Budgeting App**! Feel free to open issues, submit pull requests, or provide feedback and suggestions to help us make the app even better.
