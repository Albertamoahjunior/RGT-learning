# Simple Web Server
## Web server designed with the http module

This project was undertaking to understanding some basic stuff in javaScript.
\
In this project file operations are explored. JSON  was used to mimic a database.
\
### METHODS
HTTP nethods are also explored.\
The methods explored are:
#### GET
The GET method is used twice: getting all users and getting specific user.\
Getting a specific user : /user?id={id}\
usage: the id query takes in the id of the user you want.\
Getting all users : /users

#### POST
The POST  method is used only once to add a new user.\
the route: /add-user and then  you send the body containing the user information as JSON.\

#### PUT
The PUT method is also used just once. It is used change user's information.\
the route: /update-user?id={id}\
usage: the id query takes the id of the user you want to edit

#### PATCH
The PATCH method is also used once. It is used to edit part of a user's information. \
the route : /patch-user?id={}&field={}\
usage: the id query takes id of the user and the field takes the name of the particular field you want to edit.

#### OPTIONS


#### Usage:
Details of usage are presented in the ./basicFrontend sub directory where api calls are made in the main.js file and the results are displayed by the simple HTML page.

### CORS
CORS is also explored in this simple project. CORS is used to manage access to the backend. This is done based on Origin and methods.\
