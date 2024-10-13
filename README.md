# Home Service Application

This Node.js application provides backend functionality for managing Home Services.

## Prerequisites

Before you begin, ensure you have the following installed and set up on your system:

1. **Node.js and npm**: Ensure you have Node.js (version 14 or later) and npm (Node Package Manager) installed. You can download and install them from the official Node.js website: [nodejs.org](https://nodejs.org).

2. **PostgreSQL Database**: You need a PostgreSQL database server running. You can choose from the following options:
   - Install PostgreSQL locally (instructions available online).

## Setup

Follow these steps to set up and run the application:

### Clone the Repository

```bash
git clone https://gitlab.com/husainsaify.hk/home-services-node.git
cd home-services-node
```

### Install Dependencies

Install the required npm packages:

```bash
npm install
```

### Setup Environment Variables

Create a .env file in the root directory of the project and add the necessary environment variables. You can use the provided .env file as a reference from the Google Drive Link.

### Create Database

Log in to your PostgreSQL interface (e.g., pgAdmin or psql). Create a new database named home_service.

### Database Migrations

Run database migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```

### Start the Application

To start the Node.js application:

```bash
npm start
```

## Additional Resources

This is the drive link containing the `.env` file and Postman collection:
[Google Drive Link](https://drive.google.com/drive/folders/1KM258XeeUbEijw2_f3hs-i_s3Y8Rn_92?usp=sharing)

### Explanation

- The steps are organized sequentially for clarity.
- Inline code formatting is used for commands and filenames.
- Hyperlinks are added for easy access to external resources.
- Each section is clearly labeled for easy navigation.
