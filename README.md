# LiveLot Application API
This is the backend API for the LiveLot react-native application. This will contain the API endpoints that store user information, location information, and parking lot information (And anything else we decide we need in the future). This api is created with Node.js, Express, and MongoDB. If we decide to use a different database in the future, we can, but I chose MongoDB initially because it is free and familiar to the developers on the team.

## Prerequisites
I followed this tutorial to initially set up the node api (https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)


Necessary installs:

- npm i node

- npm i mongodb
  
- npm install --save-dev nodemon
  
- npm install express --save
  
- npm install mongoose --save
  

Dev Tools:

- VS Code (install ESLint)
  
- Postman
  
- Git
  

## How to run locally
The first time you run the application, run the command `npm install` to install the necessary node modules

Start the mongoDB server with by running the command `mongod` in the root of the project

In a seperate terminal, start the node service `npm run local`

This runs the script `nodemon server.js` and runs the api on your local machine

Use Postman to test the endpoints

## How to test deployed application
Test the endpoints with postman with using the API url: `https://livelotapi.herokuapp.com`

## Source Control and Heroku
When you make changes to this API, it needs to be pushed to both the GitHub account and deployed to heroku
- Commit and push changes to Github `git commit -m "your commit message"` then push with `git push origin master`
  
- Deploy to Heroku `git push heroku master`
  - you may need to add a new remote branch for heroku.

You should have the following remote origins
```
heroku	https://git.heroku.com/livelotapi.git (fetch)
heroku	https://git.heroku.com/livelotapi.git (push)
origin	https://github.com/maddiearogers/LiveLotAppAPI (fetch)
origin	https://github.com/maddiearogers/LiveLotAppAPI (push)
```

## Folder Structure
    /LiveLotAppAPI
        /api
            /controllers
                lotCtrl.js 
                userCtrl.js
            /models
                lotModel.js
                userModel.js
            /routes
                allRoutes.js
        package.json
        server.js
        README.md

## Endpoints
    /lot
        getAllLots - GET
        createLot - POST
            - pass a body containing a 'lot' object

    /lot/:lotId
        getLot/:lotId - GET
        updateLot/:lotId - PUT
            - pass a body containing a 'lot' object
        deleteLot/:lotId - DELETE
        carOut - PUT
        carIn - PUT

    /user
        getAllUsers - GET
        createUser - POST
            - pass a body containing a 'user' object

    /user/:userId
        getUser/:userId - GET
        updateUser/:userId - PUT
            - pass a body containing the updated 'user' object
        deleteUser/:userId - DELETE