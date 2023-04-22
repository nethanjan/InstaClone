# InstaClone

There are 3 docker containers in the project

## database : mysql 8.0

    mysql intance will be serverd with 3307 port

## backend : node(16) express server

    backend is serving under 5000 port

## frontend : react app

    frontend is serving with 3000 port

## frontend setup

install serverless

    npm install -g serverless (more at https://www.serverless.com/framework/docs/getting-started)

    cd frontend/serverless
    servereless deploy (need to have aws access key and secret key at ~/.aws/credentials)

    this is creating the default cognito user pool dev-user-pool (dev stage name)

amplify set up

    amplify configure
    amplify init
    amplify import auth, select dev-user-pool (name in serverless set up) as cognito user pool
    amplify push

### Run frontend independently in dev environment

    npm install
    npm run dev

    to run test cases
        npm run test

        npm test -- --coverage (with coverage report)
        coverage report is stored at FRONTEND_APP:/coverage/index.html

To build and run the containers

    docker compose up --build
