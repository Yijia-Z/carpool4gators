# Carpoo4gator

Carpoo4gator is a trip management system available only to UF students that connects drivers and passengers who want to share rides. It allows users to search for trips based on departure location, destination, time, and available seats. It also allows drivers to create trips with their contact information and receive feedback and ratings from passengers.

Both drivers and riders can register an account for this app. To start a carpool in this web app, drivers need to fill in where they are from and where they are going, as well as the available time. Riders can see a list of available drivers after choosing their starting point, destination and time. 

## Installation

To install and run this project, you will need to have Node.js and MySQL installed on your machine. You will also need to clone this repository from GitHub using the following command:

```
git clone https://github.com/Yijia-Z/carpoo4gator.git
```

Then, navigate to the project directory and install the dependencies in /frontend using:

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

## License

This project is licensed under the MIT License. See [LICENSE](chrome-extension://kdlmggoacmfoombiokflpeompajfljga/LICENSE) file for more details.
