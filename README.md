# Batch Editing Service

The service has a single endpoint `(POST “/batch”)`.
This endpoint receives an action to perform, as well as an array of payloads, describing the payload to be sent in each invocation of the action.

This BES allows to create / update / delete multiple resources at once and manage the batch job running of any other service in the system.

## Installation

Requires [Node.js](https://nodejs.org/en/download/) >=v8.4.0 and npm >=6.4.1.

Install dependencies: `npm install`

## Quick Start

To start development server: 
```bash
$ npm run dev
```

Server is listened on port `8080`

## API documentation

Supported endpoints:
* POST `http://localhost:8080/batch`
* for testing we use [User Service](https://guesty-user-service.herokuapp.com) with support methods: `GET, PUT, POST, DELETE`. with PATH parameters (`/user/{userId}`) and without (`/user`)
* exmaple of request structure:
    ```js
    {
        "request": {
            "verb":"GET",
            "url":"​https://guesty-user-service.herokuapp.com/user/{userId}"
        },
        "payloads":[{
            "userId": 14,
            "age": 30
        }, {
            "userId": 29,
            "age": 30
        }, {
            "userId": 103,
            "age": 30
        }]
    }
    ```
* exmaple of response structure (status can be different for each call):
    ```js
    {status: 2/1}
    ```
    where 2 - is number of succeed
    and 1 - is number of failed

## How to test batch service

Make sure you have development server up and running.
1. open terminal and run:
    
    * with PATH parameters
    ```bash
    $ curl -X POST http://localhost:8080/batch -d '{"request":{"verb":"GET","url":"https://guesty-user-service.herokuapp.com/user/{userId}"},"payloads":[{"userId":14,"age":30},{"userId":19,"age":30}, {"userId":103,"age":30}]}' --header "Content-Type: application/json"
    ```

    * without PATH parameters
    ```bash
    $ curl -X POST http://localhost:8080/batch -d '{"request":{"verb":"POST","url":"https://guesty-user-service.herokuapp.com/user/"},"payloads":[{"userId":14,"age":30},{"userId":19,"age":30}, {"userId":103,"age":30}]}' --header "Content-Type: application/json"
    ```
2. as result you should see response in JSON format like:
```js
{"status":"3/0"}
```

## Notes:

* npm package `nodemon` is used only in development purposes. (nodemon - is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected)
* Since the assignment is time limited, I did not spend time on naming functions.
