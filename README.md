
---

# HelloIP

HelloIP is a simple Node.js application that returns a personalized greeting along with the client's IP address. It demonstrates the basic use of Express.js to handle HTTP requests and is deployed using Vercel.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Server Locally](#running-the-server-locally)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 12.0.0 or higher)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/helloip.git
   cd helloip
   ```

2. **Install the dependencies**:
   ```sh
   npm install
   ```

## Running the Server Locally

Start the server by running:

```sh
npm devStart
```

By default, the server will run on port 3000. You can open your browser and navigate to `http://localhost:3000/YourName`, replacing `YourName` with any name you want.

Example:

```sh
http://localhost:3000/Mark
```

You should see a JSON response similar to:

```json
{
  "message": "👋 Hello, John! 🌍",
  "ipAddress": "::1",
  "status": 200
}
```

If you access `http://localhost:3000/` without providing a name, you will receive a `400 Bad Request` status with a JSON response:

```json
{
  "message": "😕 Please enter a name",
  "status": 400
}
```

## Deployment

This project is configured to be deployed on Vercel.

## Folder Structure

The project's folder structure is as follows:

```plaintext
HelloIP/
│
├── node_modules/    # Directory for npm packages
├── .gitignore       # To ignore node_modules and other unnecessary files
├── vercel.json      # Vercel configuration file
├── server.js        # Main server file
├── package.json     # Node.js project metadata and dependencies
└── README.md        # Project description and usage instructions
```

### File Descriptions

- **node_modules/**: Contains all the npm packages installed for this project.
- **.gitignore**: Specifies which files and directories to ignore in git commits.
- **vercel.json**: Configuration file for deploying on Vercel.
- **server.js**: The main server file that handles incoming HTTP requests.
- **package.json**: Contains project metadata, dependencies, and scripts.
- **README.md**: Documentation for the project.

---
