Youtube Link: https://youtu.be/bJ4zDyyPpfQ

#### Backend APIs

1.1 User register

Request method：POST

Request URL：/api/user/add_user

Request parameter：

| Parameter | Type   | Required | Description  |
| --------- | ------ | -------- | ------------ |
| username  | string | Yes      | User name    |
| password  | string | Yes      | Password     |
| email     | string | Yes      | Email        |
| phone     | string | Yes      | Phone number |

Respond Parameter：

| Parameter | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| code      | int    | return code，0 = success               |
| msg       | string | return message                         |
| data      | object | return data，includes user information |



1.2 User Login

Request Method: POST

Request URL: /api/user/login

Request Parameters:

| Parameter Name | Type   | Required | Description |
| -------------- | ------ | -------- | ----------- |
| username       | string | yes      | User name   |
| password       | string | yes      | Password    |

Response Parameters:

| Parameter Name | Type   | Description                               |
| -------------- | ------ | ----------------------------------------- |
| code           | int    | Response code, 0 means success            |
| msg            | string | Response message                          |
| data           | object | Response data, including user information |



2.1 Driver Registration

Request Method: POST

Request URL: /api/driver/register

Request Parameters:

| Parameter Name | Type   | Required | Description           |
| -------------- | ------ | -------- | --------------------- |
| username       | string | yes      | Driver's username     |
| password       | string | yes      | Driver's password     |
| email          | string | yes      | Driver's email        |
| phone          | string | yes      | Driver's phone number |

Response Parameters:

| Parameter Name | Type   | Description                                              |
| -------------- | ------ | -------------------------------------------------------- |
| code           | int    | Response code, 0 means success                           |
| msg            | string | Response message                                         |
| data           | object | Response data, including driver ID and registration time |



2.2 Driver Login

Request Method: POST

Request URL: /api/driver/login

Request Parameters:

| Parameter Name | Type   | Required | Description     |
| -------------- | ------ | -------- | --------------- |
| username       | string | Yes      | Driver username |
| password       | string | Yes      | Driver password |

Response Parameters:

| Parameter Name | Type   | Description                           |
| -------------- | ------ | ------------------------------------- |
| code           | int    | Response code, 0 indicates success    |
| msg            | string | Response message                      |
| driver_id      | int    | Driver ID                             |
| token          | string | Token obtained after successful login |



3.1 Get Driver Information

Request Method: GET

Request URL: /api/driver/{driver_id}

Request Parameters:

| Parameter Name | Type | Required | Description |
| -------------- | ---- | -------- | ----------- |
| driver_id      | int  | Yes      | Driver ID   |

Response Parameters:

| Parameter Name | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| code           | int    | Response code, 0 indicates success          |
| msg            | string | Response message                            |
| driver_id      | int    | Driver ID                                   |
| username       | string | Driver username                             |
| email          | string | Driver email                                |
| phone          | string | Driver phone number                         |
| rating         | float  | Driver rating                               |
| current_trip   | object | Current trip of the driver, null if no trip |

Properties of current_trip object:

| Parameter Name | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| start_point    | string | Starting point of the trip           |
| end_point      | string | Destination of the trip              |
| time           | string | Time of the trip, in ISO 8601 format |
| capacity       | int    | Capacity of the vehicle              |
| contact        | string | Contact information of the driver    |



3.2 Update Driver Information

Request Method: PUT

Request URL: /api/driver/{driver_id}

Request Parameters:

| Parameter Name | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| driver_id      | int    | Yes      | Driver ID           |
| username       | string | No       | Driver Username     |
| email          | string | No       | Driver Email        |
| phone          | string | No       | Driver Phone Number |
| password       | string | No       | Driver Password     |

Response Parameters:

| Parameter Name | Type   | Description                |
| -------------- | ------ | -------------------------- |
| code           | int    | Return code, 0 for success |
| msg            | string | Return message             |



3.3 Get Driver Rating List

Request Method: GET

Request URL: /api/driver/{driver_id}/ratings

Request Parameters:

| Parameter Name | Type | Required | Description |
| -------------- | ---- | -------- | ----------- |
| driver_id      | int  | Yes      | Driver ID   |

Response Parameters:

| Parameter Name | Type   | Required | Description      |
| -------------- | ------ | -------- | ---------------- |
| review_id      | int    | Yes      | Review ID        |
| user_id        | int    | Yes      | User ID          |
| rating         | int    | Yes      | Rating (1-5)     |
| timestamp      | string | Yes      | Rating Timestamp |



3.4 Get Driver Current Trip

Request：

```bash
GET /api/driver/{driver_id}/trip
```

Request Parameters:

| Parameter Name | Type | Required | Description |
| -------------- | ---- | -------- | ----------- |
| driver_id      | int  | Yes      | Driver ID   |

Response Parameters:

| Parameter Name  | Type   | Required | Description        |
| --------------- | ------ | -------- | ------------------ |
| trip_id         | int    | Yes      | Trip ID            |
| start_location  | string | Yes      | Starting Location  |
| end_location    | string | Yes      | Destination        |
| start_time      | string | Yes      | Starting Time      |
| seats_available | int    | Yes      | Available Seats    |
| contact_info    | string | Yes      | Contact Info       |
| passenger_list  | array  | No       | List of Passengers |

 

4.1 Search Trips

**Request Method:** GET

**URL:** `api/trips`

**Request Parameters:**

| Parameter   | Required | Type   | Description                           |
| ----------- | -------- | ------ | ------------------------------------- |
| start       | Yes      | string | Starting point of the trip            |
| destination | Yes      | string | Destination of the trip               |
| date        | Yes      | string | Date of the trip in YYYY-MM-DD format |
| seat_count  | Yes      | int    | Number of seats required for the trip |

**Response Parameters:**

| Parameter       | Type   | Description                           |
| --------------- | ------ | ------------------------------------- |
| id              | int    | ID of the trip                        |
| driver_id       | int    | ID of the driver                      |
| start           | string | Starting point of the trip            |
| destination     | string | Destination of the trip               |
| date            | string | Date of the trip in YYYY-MM-DD format |
| seat_count      | int    | Total number of seats in the trip     |
| available_seats | int    | Number of available seats in the trip |
| price           | float  | Price of the trip in dollars          |

**Note:**

- If there are no trips that match the search criteria, an empty array will be returned.



4.2 Create Trip

**Request Method:** POST

**URL:** `api/trips`

**Request Parameters:**

| Parameter    | Required | Type   | Description                               |
| ------------ | -------- | ------ | ----------------------------------------- |
| start        | Yes      | string | Starting point of the trip                |
| destination  | Yes      | string | Destination of the trip                   |
| date         | Yes      | string | Date of the trip in YYYY-MM-DD format     |
| seat_count   | Yes      | int    | Number of seats available for the trip    |
| price        | Yes      | float  | Price of the trip in dollars              |
| contact_info | Yes      | string | Contact information for the trip provider |

**Response Parameters:**

| Parameter | Type | Description                  |
| --------- | ---- | ---------------------------- |
| id        | int  | ID of the newly created trip |



4.3 Request to Join Trip

**Request Method:** POST

**URL:** `api/trips/{trip_id}/join`

**Request Parameters:**

| Parameter | Required | Type | Description            |
| --------- | -------- | ---- | ---------------------- |
| user_id   | Yes      | int  | User ID                |
| seats     | Yes      | int  | Number of seats needed |

**Response Parameters:**

None



4.4 Cancel Trip Join Request

**Request Method:** POST

**URL:** `api/trips/{trip_id}/cancel`

**Request Parameters:**

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| user_id   | Yes      | int  | User ID     |

**Response Parameters:**

None



5.1 Confirm Trip and Rate Driver

Request Method: POST

URL: `api/trips/{trip_id}/confirm`

Request Parameters:

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| rating    | number | Yes      | Rating, range 1-5 |

Response Parameters:

| Parameter | Type   | Description     |
| --------- | ------ | --------------- |
| message   | string | Success message |



#### Unit test

```go
TestAddUserApi()
TestAddUserApi1()
TestLoginApi()
TestLoginApi1()
TestUpdateUserApi()
TestUpdateUserApi1()
TestDeleteUserApi()
TestDeleteUserApi1()
TestAddDriverApi()
TestAddDriverApi1()
TestDriverLoginApi()
TestDriverLoginApi1()
TestDriverUpdateApi()
TestDriverUpdateApi1()
TestGetDriverApi()
TestGetDriverApi1()
TestGetDriverRatingsApi()
TestGetDriverRatingsApi1()
```

#### New Functionality
We implemented some new functionalities and wrote unit tests for them.
1. Driver registration and login feature: Drivers can register a new account or login with an existing account.
2. Driver information management: Drivers can manage their personal information, rating, and current trips.
3. Trip management: Users can search for trips based on the departure location, destination, time, and available seats. Drivers can create trips with departure location, destination, time, available seats, and contact information. Once matched, users can request to join a driver's trip.
4. Rating feature: Users can confirm trips and provide feedback and ratings for drivers.





### Front End Progress

**Old components are rewritten to communicate with back end using axios:**

- Search trip
- Confirm trip
- Create trip
- Driver info
- Driver login
- User login
- User register
- Sign UP
- Log In

### Front End unit tests

- ConfirmTrip.cy.js
- CreateTrip.cy.js
- SearchTrips.cy.js
- DriverInfo.cy.js
- DriverRegister.cy.js
- SearchTrips.js
- UserLogin.cy.js
- UserRegister.cy.js


