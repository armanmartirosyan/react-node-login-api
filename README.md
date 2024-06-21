# User Authorization Application

This repository contains a user authorization application built with React, Node.js, TypeScript, and MySQL. It provides robust authentication and access control features, suitable for secure web applications.

## Table of Contents

- [Installation](#installation)
  - [Manual Configuration](#manual-configuration)
  - [Using Docker and Docker-Compose](#using-docker-and-docker-compose)
- [Usage](#usage)
  - [Registration and Login](#registration-and-login)
  - [Accessing Users List](#accessing-users-list)
- [License](#license)

## Installation

You can install application manually or by using docker-compose.

### Manual Configuration

If you prefer manual configuration without Docker, follow these steps:

#### Prerequisites

- Node.js (v22+)
- MySQL database
- Any web server (for serving client side)
- npm or yarn package manager

#### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/armanmartirosyan/react-node-login-api.git
   ```

2. **Set up environment variables:**

     Create `.env` files in the client and server directories of the project, using the provided `.env-example` files as templates. Customize the values of the variables in each `.env` file according to your environment and configuration needs. These environment variables are essential for configuring database connections, API keys, and other sensitive information required by the User Authorization application.

3. **Configure server-side:**

   Inside the `server` folder install server-side dependencies listed in the package.json file and execute the database migrations.

    ```bash
    npm install && npm run migrate:latest 
    ```

   Build and start the application.

    ```bash
    npm start
    ```

4. **Configure client-side:**

     Inside the `client` folder install the client-side dependencies listed in the package.json file.

     ```bash
     npm install
     ```

     Serve the `client/dist` directory with a static file server or configure your web server to serve it. I use `nginx`, it's configuration file you can find in `client/conf` directory.

5. **Access the application**

      Open `http://localhost:<port>` in your browser, where `<port>` is the port configured for your server.

### Using Docker and Docker-Compose

If you prefer using Docker for a simplified setup, follow these steps:

#### Prerequisites

- Docker
- Docker-Compose

#### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/armanmartirosyan/react-node-login-api.git
   ```

2. **Set up environment variables:**

     Create `.env` files in the client and server directories of the project, using the provided `.env-example` files as templates. Customize the values of the variables in each `.env` file according to your environment and configuration needs. These environment variables are essential for configuring database connections, API keys, and other sensitive information required by the User Authorization application.

3. **Start Docker containers:**

    ```bash
    docker compose up -d
    ```

4. **Access the application**

      Open `http://localhost` in your browser.

## Usage

### Registration and Login

1. **Register:**
   - Navigate to the registration page.
   - Enter your details including email and password.
   - Submit the form.
   - Check your email for a verification link.

2. **Verify Email:**
   - Click on the verification link received in your email to verify your account.
   - Upon successful verification, you can proceed to log in.

3. **Log In:**
   - Navigate to the login page.
   - Enter your registered email and password.
   - Submit the form to log in to your account.

### Accessing Users List

1. **Authenticated Users:**
   - Once logged in, authenticated users can access the list of all users.
   - Users can view details such as usernames, emails, and other relevant information about registered users.

This usage guide outlines the primary functionalities of the User Authorization application, focusing on user registration, authentication, email verification, and accessing user information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
