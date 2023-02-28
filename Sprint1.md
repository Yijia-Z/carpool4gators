# User Stories

## Front Page

As a site user, I want to be able to have an account on the website, so I can have my profile stored in my account.  
As a site visitor, I want to search for available carpools in as few steps as possible. (As simple as entering the destination and date of the carpool).  

## Drivers List

As a rider, I want to have a list of drivers available after I searched with for destination and date.  
As a rider, I can see if the carpool is a single trip or round trip right at the drivers’ list page.  
As a rider, I can have basic information like available seats, dates and profile pictures of the driver on the drivers' list page.  
As a site user, I can change the searching constraints like destination and date right at the driver's list page.  

## Drivers Rating

As a site user, I can rate the drivers after I finished my ride.  
As a rider, I can see the drivers’ overall rating by clicking one of the listed drivers.   

# What issues your team planned to address

The front-end team plans to set up a homepage without a database for now, trying to design some elements and templates for pages on figma. Also, the react app should have the ability to call external API.

The back-end team plans to build a database for users and be able to interact with the front end. The database content includes the driver's name, origin, destination, rating, etc. Passenger's name, time, origin, destination and other information.

# Which ones were successfully completed

The front-end team successfully designed and refined the form of the web application, built a react app template and tried to call external API such as Mapbox (not yet used in actual web pages).

The backend has now successfully established the golang framework and established four API interfaces. In addition, the backend successfully created a MySQL database table.

# Which ones didn't and why?

The front-end team did not organically combine all the elements needed in a web page because our team lacked experience with React, Node, and had weak CSS design skills. In addition, due to the inconsistency of the technology stack, the team spent a lot of time to work together and determine the final technology direction.

The backend does not have a detailed database. This is because we have just started learning Golang and MySQL and need more time to achieve these goals.
