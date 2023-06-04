### Every Folder

1. app: file contain the app file
2. config: get all  the configuration logic ex: mongo connect 
3. controller: business logic behind the application
4. middleware: keep the middleware logic to check for example every user credentials
5. model: where the data is going to reside
6. utils:  contain utility function
7. server.js: will run the server that's it


### Initialize the project

`npm init --yes`
### Then install the packages to use

`npm install express mongoose`

### Install the Dev dependencies
`npm i nodemon morgan -D`

### Install dotenv to manage the env for the project
`npm i dotenv`

1. nodemon: will help restart the server anytime we make change
2. morgan: the logger that is endpoint that we make the request to

### Install bcryptjs to hash the password
`npm install bcryptjs`

### Install the express handler package 
`npm i express-async-handler`

### Design Pattern (MVC)
It's a way of structuring your project
M: model (data in Application) model cannot talk to view whereas the model can talk directly to the view
V: View (User Interface)
C: controller (Business Logic)

### Express Middleware
1. Middleware are functions that have access to the request object (req), the response object (res), the functions are used to modify req and res objects before they are passed to the next middleware function
2. Uses of Middleware: authorization, logging, error handling, rate limiting, data validation ...
3. whatever we pass in app.use is used as a middleware function.


### JWT
1. Allows you tod= decode, verify and generate JWT
`npm i jsonwebtoken`
