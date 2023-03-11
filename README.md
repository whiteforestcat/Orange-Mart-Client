# ORANGE MART

An ecommerce app which enables users to purchase groceries at teh comfort of their homes.

Key technolgoies used:

|    **Frontend**     |    **Controller**           |               **Backend**            |
| ------------------- | --------------------------- | ------------------------------------ |
| React.js            | Express.js                  | Postgresql                           |
| Vanilla CSS         | Restful APIs                | (refer to SQL folder in Backend Repo)|
| Tailwind CSS        | HTTP requests - CRUD        |                                      |
| React Toastify      | User Authenticated Routes   |                                      |
|                     | - Non-User                  |                                      |
|                     | - Normal User               |                                      |
|                     | - Admin User                |
There is more emphasis on designing on the SQL database, which can be found [here](#database-tables--relationships). There is a need for a logger-service table to link data between connected users, although the project hasn't included that functionality as of now.

THe project also incoporates user authentication as well, through protected routes with the controller. The passwords are hashed with bcrypt, and access/refresh tokens are generated with Json Web Tokens (JWTs). However, the actual JWT log out is not implmented as of now.

## Users

There are 3 main types of users

**User Type**         |    **Non-Registered User**                    |            **Normal User**                |               **Admin User**            |
| ------------------- | --------------------------------------------- | ----------------------------------------- | --------------------------------------- |
| **Access**          | View gallery of items                         | All access rightsof a Non-Registered User | All access rights of a Normal User      |
|                     | Check item details like price and quantity    | Add item to favourites                    | View all user accounts                  |
|                     |                                               | View Favourites Page                      |                                         |
|                     |                                               | Add item to Cart                          |                                         |
|                     |                                               | View Cart                                 |                                         |
|                     |                                               | Proceed to pay item for shipment          |                                         |
|                     |                                               | Cancel Paid Order                         |                                         |




## Diagrams

#### Database tables & relationships

![database tables & relationships](./diagrams/database/display-db-rs.drawio.svg)

#### Snapshots

![welcome page](./diagrams/snapshots/welcome-page.png)

![records adding page](./diagrams/snapshots/add-records-page.png)

![admin page](./diagrams/snapshots/admin-page.png)

## Installation / Dependencies

#### Client:

1. npm i react-router-dom
2. npm install -D tailwindcss postcss autoprefixer
3. npx tailwindcss init -p
4. npm install --save react-toastify

#### Server:

1. npm init -y
2. npm i express nodemon
3. npm i pg cors dotenv
4. npm i jsonwebtoken bcrypt

_.env config:_

1. ACCESS_SECRET
2. REFRESH_SECRET

## Challenges & unsolved problems

**1. Database design**

Much time has been spent reiterating the SQL tables & relationships. As this was the first time doing, I felt like I was going around in circles. Probably took on more than I could chew too. Nevertheless, it was fun linking tables together.

**2. User Authentication**

I initially struggled understanding the concept of JWT and implementation of user authentication. It took me a while to figure out the process from generating the JWT with payload information on login, to obtaining the access tokens from the request body, to decoding of JWT in the middleware and retrieving the decoded payload in the controller at the request endpoint.

**3. Time management**

In the 10 days timeframe of this project, too much emphasis was given on the database & server. It took slightly over a week, with slightly more than 3 days to work on the frontend development. As a result, not much of the backend work could be implemented. On a personal note, I need to replan my approach to beter manage expectations and workload before starting on projects. Another hurdle on a similar note is a personal problem with balancing functionality and aesthetics when it comes to frontend dev. This slows down the progress towards reaching the MVP stage.

#### To complete:

**1. Server**

Most of the endpoints that were planned for is generally not completed and not tested, let alone implemented in the frontend. I am excited to work on the Logger-servicer interactions.

**2. Client**

One of the benefits with working with tailwind is that I can reuse most CSS templates for different pages much easier than using vanilla CSS. Since I have more or less decided on the design of the UI components, I can focus on the functionalities for the rest of the frontend components. As of now, I have yet to incorporate the records page, connect and services page, profile page for different users, and reviews and comments functionalities of the servicers.