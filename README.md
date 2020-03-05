# Remote-Concurrent-Scheduler
  This is our Fall 2019 - Spring 2020 Senior Capstone for the Univerisity of North Dakota Computer Science Department. Our project is a digital signage scheduling solution for the Conference Room in Upson II. We have setup two Raspberry Pi's (one for the web server and database and another for the 7" display). 

## Installation
```
  git clone https://github.com/bstafford2017/remote-concurrent-scheduler.git
  cd remote-concurrent-scheduler
  npm install
```
> These commands clone the repository and install all the required dependencies from the package.json file.

## Start the server
```
  npm run start
```
> This command runs the index.js file which starts to listen on localhost (127.0.0.1) 
  port 5000. Now, open a web browser of your choice. Type localhost:5000 in 
  the URL and you should be presented with a login screen. After setuping 
  up an account through the administrator of the system, you will be able
  to schedule events and update your account information as need be.

## Credits
  Huge thanks to Nancy Nattum, Kathie Jonke, and Professor John Nordlie for 
  all the help and encouragement along the way!
