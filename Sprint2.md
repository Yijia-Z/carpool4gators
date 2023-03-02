#### Backend APIs

The backend API for Carpool4gators is responsible for handling all the data and logic associated with the carpooling system. It provides various endpoints that enable the web application to interact with the backend and access the data.

API:

1. User Authentication:
   - /api/login (POST) - Authenticates a user by username and password. It returns an authentication token that the client can use for subsequent requests.
   - /api/logout (POST) - Logs out a user by invalidating the authentication token.
   - /api/add_user (POST) - Registers a new user by creating a new user account in the backend database.
2. Rides:
   - /api/rides (GET) - Retrieves a list of available rides. The API returns all rides that are currently available for booking, including the ride details such as the pickup and drop-off location, the number of available seats, and the fare.
   - /api/rides/:id (GET) - Retrieves the details of a specific ride identified by the ride ID.
   - /api/rides (POST) - Creates a new ride by adding a new entry to the backend database. The API requires the user to provide the necessary ride details, such as the pickup and drop-off location, the departure time, and the fare.
   - /api/rides/update_rides (PUT) - Updates an existing ride identified by the ride ID. The API allows the user to update the ride details, such as the pickup and drop-off location, the departure time, and the fare.
   - /api/rides/delete_rides (DELETE) - Deletes an existing ride identified by the ride ID. The API removes the ride details from the backend database and updates any associated bookings.
3. Bookings:
   - /api/bookings (GET) - Retrieves a list of all bookings made by the user. The API returns all the bookings made by the user, including the ride details and the booking status.
   - /api/bookings/:id (GET) - Retrieves the details of a specific booking identified by the booking ID. The API returns the booking details, including the ride details and the booking status.
   - /api/bookings (POST) - Creates a new booking by adding a new entry to the backend database. The API requires the user to provide the necessary booking details, such as the ride ID and the number of seats booked.
   - /api/bookings/update_booking (PUT) - Updates an existing booking identified by the booking ID. The API allows the user to update the booking details, such as the number of seats booked and the booking status.
   - /api/bookings/delete_booking (DELETE) - Deletes an existing booking identified by the booking ID. The API removes the booking details from the backend database and updates any associated rides.
4. Users:
   - /api/users (GET) - Retrieves a list of all users. The API returns all the registered users in the backend database.
   - /api/users/:id (GET) - Retrieves the details of a specific user identified by the user ID. The API returns the user details, such as the username, email, and profile picture.
   - /api/users/update_user (PUT) - Updates an existing user identified by the user ID. The API allows the user to update their profile details, such as the email and profile picture.
   - /api/users/delete_user (POST) - Deletes an existing user identified by the user ID. The API removes the user details from the backend database and updates any associated rides and bookings.



#### Unit tests for backend

```go
TestAddUserApi()
TestAddUserApi1()
TestLoginApi()
TestLoginApi1()
TestUpdateUserApi()
TestUpdateUserApi1()
TestDeleteUserApi()
TestDeleteUserApi1()
TestUpdateRides()
TestUpdateRides1()
TestUpdateBooking()
TestUpdateBooking1()
TestDeleteRides()
TestDeleteRides1()
TestDeleteBooking()
TestDeleteBooking1()
```

The front end accomplishes the following:
Haoyuan Xu:
- A registration interface that can check if the input is legitimate
- A navigation bar that can jump to different URLs
- Homepage

Yijia Zhao:
- Another pair of login/registration interfaces that jump to each other
- Two driver pages of different complexity, one contains an edit button and a request to join button
- Search carpool page
- Create carpool page
- Trip information page with passenger confirmation/cancellation and rating of the driver
A cypress test code covers the following scenarios:
-  driver information is correctly displayed.
-  request to join section is correctly displayed.
-  edit information button click event is correctly handled.
-  request to join button click event is correctly handled.

The unit tests covers the Navbar & SignUp component

Detail work you've completed in Sprint 2
- Zhuoer Wang: Write part of backend test api and test backend
