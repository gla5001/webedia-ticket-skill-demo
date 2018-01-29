# webedia-ticket-skill-demo

## Setup steps

- create project directory
    
    `mkdir <project> && cd <project>`

- create serverless project 
    (make sure serverless is installed globally. `npm i serverless -g`)
    
    `serverless create --template google-nodejs`
    
- run `npm install`
    
- Set up Google cloud cred. Follow [https://serverless.com/framework/docs/providers/google/guide/credentials/](https://serverless.com/framework/docs/providers/google/guide/credentials/)

- Update the `project` and `credentials` in your projects serverless.yml

- Deploy `serverless deploy`

- [optional] Invoke function `serverless invoke --function <function  name in yaml file>`

You can get the URL for the endpoint by running the `serverless info` command after deploying your service.