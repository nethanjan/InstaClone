# InstaClone

There are 3 docker containers in the project

## database : mysql 8.0

    mysql intance will be serverd with 3307 port

## backend : node(16) express server

    backend is serving under 5000 port

## frontend : react app

    frontend is serving with 3000 port

### Run frontend independently in dev environment

    npm install
    npm run dev

    to run test cases
        npm run test

        npm test -- --coverage (with coverage report)
        coverage report is stored at FRONTEND_APP:/coverage/index.html

To build and run the containers

    docker compose up --build
