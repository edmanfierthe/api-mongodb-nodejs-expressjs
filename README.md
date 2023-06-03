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

### Design Pattern (MVC)
It's a way of structuring your project
M: model (data in Application) model cannot talk to view whereas the model can talk directly to the view
V: View (User Interface)
C: controller (Business Logic)

