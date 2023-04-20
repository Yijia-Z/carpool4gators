# Carpoo4gator

Carpoo4gator is a trip management system available to UF students that connects drivers and passengers who want to share rides. It allows users to search for trips based on departure location, destination, time, and available seats. It also allows drivers to create trips with their contact information and receive feedback and ratings from passengers.

Both drivers and riders can register an account for this app. To start a carpool in this web app, drivers need to fill in where they are from and where they are going, as well as the available time. Riders can see a list of available drivers after choosing their starting point, destination and time. 

## Installation

To install and run this project, you will need to have Node.js and MySQL installed on your machine. You will also need to clone this repository from GitHub using the following command:

```
git clone https://github.com/Yijia-Z/carpoo4gator.git
```

Then, navigate to the project directory <.../carpool4gators/frontend/> and install the dependencies in /frontend using:

```
npm install
```

Finally, you can start the server using:

```
npm start
```

The server will run on [http://localhost:3000](http://localhost:3000/) by default.

## Usage

To use this project, you will need to register as either a driver or a user. You can do this by clicking on the "Sign Up" button on the navigation bar and filling out the required fields.

As a driver, you can create trips by clicking on the "Create Trip" button on the navigation bar and entering the details of your trip. You can also edit your personal information by clicking on the "Driver Info" button on the navigation bar and updating your name, email, phone number, or password.

As a user, you can search for trips by clicking on the "Search Trips" button on the navigation bar and entering your desired departure location, destination, date, and number of seats. You can then view the available trips that match your criteria and request to join them by clicking on the "Join" button. You can also cancel your join request by clicking on the "Cancel" button.

After completing a trip, you can confirm it by clicking on the "Confirm Trip" button on the navigation bar and rate the driver by giving them a score from 1 to 5 stars.

## Contributing

We welcome contributions from other developers who are interested in improving this project. If you want to contribute, please follow these steps:

- Fork this repository and create a new branch for your feature or bug fix.
- Write clear and concise code that follows the style guide and best practices.
- Write unit tests for your code using Cypress or other testing frameworks.
- Commit your changes with descriptive messages and push them to your branch.
- Create a pull request with a detailed description of your changes and link it to the corresponding issue if any.
- Wait for feedback from the maintainers and address any comments or requests.

## Backend

- `cmd`: This folder stores the main commands of the application.
- `common`: This folder usually contains some common functions or tools that can be used by other files in the project.
- `conf` or `config`: This folder is where configuration files are stored. It usually contains project configuration information such as database connection strings, API keys, etc.
- `consts`: This folder contains constants used throughout the project.
- `database`: This folder stores code that interacts with the database.
- `model`: This folder stores data models such as structures.
- `query`: This folder stores query statements that interact with the database.
- `router`: This folder stores route handlers that map requests to specific handlers.
- `service`: This folder stores business logic code.
- `util`: This folder stores helper functions such as formatting functions.

The file `build.sh` is used to automate the project's build process. It can perform tasks such as compiling, packaging, testing, etc.

The file `main.go` is an entry point for a Go program. It contains the main logic of the project and is responsible for starting the program, performing initialization and handling HTTP requests.

To run this backend:
1. Download Goland and install it
2. Download MySQL and install it (remember password), then configure environment variables
3. Open backend project in Goland, execute "go mod tidy" command in terminal
4. Write your MySQL password into "config_release.yaml" file (change password line to your MySQL password)
5. Login to MySQL in command line, create a database named "car", execute SQL file
6. Click on green triangle to run program

To test this backend using Postman:
1. Download Postman
2. Select post request, fill in path (e.g., localhost:18080/user/update_user), send JSON for testing (to know how to write JSON, see input parameters of API you want to test)
3. Download Navicat which can help visualize databases so that testing results can be more convenient to read



## License

This project is licensed under the GNU General Public License v3.0. See LICENSE file for more details.
