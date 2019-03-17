# TylerTime

A webapp focusing on task-oriented productivity. Built using Python (Flask), React (Redux) and PostgreSQL. 
Inspiration taken from Trello and Toggl. 
Part of our work in the course Web-applications DAT076 spring 2019. 

### Installation

The server runs on python 3. 

Clone or download the repository into a directory of your choosing. 

Navigate into the root directory `../dat076proj/`

Install all required node packages and modules
`npm install`

Install all required python modules with `pip` or `pip3` depending on your python setup. 
This is probably easiest by trying to start the server over and over again by
`python backend/server.py`
and then doing
`pip install <module name>`
for each of the modules that you are missing. There must be some other way to do this but I can't be bothered right now. 

### Start the server and front-end serving
Start the server by standing in the root directory and running `python backend/server.py`

Start the client side serving by standing in the root directory and running `npm run start`

The database is running remotely via SQLElephant. Only five connections are permitted at any time so if you run into a flurry of exceptions, connections might not be closed which in turn locks all later attempts of api calls. To solve this, restart the server. Worked for us...

If the server becomes completely irresponsive then contact us. 

### How to run our testing
While standing in the root directory `../dat076proj/`, 

`pytest backend/tests/test_minimal.tavern.yaml -v` will test the API calls

`npm test` will test the client-side code
