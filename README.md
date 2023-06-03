### Every Folder

app: file contain the app file
config: get all  the configuration logic ex: mongo
controller: business logic behing the application
middleware: keep the middleware logic to check for example every user credentials
model: where the data is going to reside
utils:  contain utility function

server.js: will run the server that's it


### Initialize the project

npm init --yes

### Then install the packages to use
npm install express mongoose

### Install the Dev dependencies
npm i nodemon morgan -D
nodemon: will help restart the server anytime we make change
morgan: the logger that is endpoint that we make the request to 