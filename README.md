# Remote-Concurrent-Scheduler
  This is our Fall 2019 - Spring 2020 Senior Capstone for the Univerisity of North Dakota Computer Science Department. This project is a digital signage scheduling solution for the Conference Room in Upson II. We have setup two Raspberry Pi's (one for the web server/database and another for the 7" display). 

## Requirements
 In order to run this web app, you must have the following:
 - Node JS
 - MySQL Server
  
  The configuration file for the MySQL database can be found in *utils/database.js*. The database schema for this project is located in the *schema.txt* file.
  In order to login, it requires you to create a user in the database using the MySQL client or MySQL Workbench on the first startup of the system.

## Installation
```
  git clone https://github.com/bstafford2017/remote-concurrent-scheduler.git
  cd remote-concurrent-scheduler
  npm install
```
> These commands clone the repository and install all the required dependencies from the *package.json* file.

## Start the server
```
  ./server.sh
```
> This command runs the index.js file which starts to listen on localhost (127.0.0.1) 
  port 5000. After setting up an account through the administrator, you will be able
  to schedule events and update your account information as need be.

## Credits
  Huge thanks to Nancy Nattum, Kathie Jonke, and Professor John Nordlie for 
  all the help and encouragement along the way!
