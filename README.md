# My Memes Serverless project

The project focus was the **serverless backend** the frontend still has some bugs but serves the project's purpose. It is the Serverless Capstone project for the Udacity Cloud Developer Nanodegree, which has the following criteria to pass:

* Functionality:
  * Create, update, delete items
  * File upload
  * Authentication
* Codebase:
  * The code is split into multiple layers separating business logic from I/O related code.
  * Code is implemented using async/await and Promises without using callbacks
* Best Practices:
  * All resources in the application are defined in the "serverless.yml" file
  * Each function has its own set of permissions.
  * The application has sufficient monitoring.
  * HTTP requests are validated
* Architecture:
  * Data is stored in a table with a composite key.
  * Scan operation is not used to read data from a database.
  
## Frontend usage
* User must sign in to use the application
* User can make categories for pictures (when making a category user must upload at least a starting picture)
* User can upload any amount of pictures to any of the categories
* User can delete a category, which also deletes all images in it
* User can delete an image, which updates the category

## Basic Local Deployment

**Prerequisite**: Installed and setup AWS SDK and Serverless

1. Register a Single Page application with Auth0:
2. Set Allowed callback to http://localhost:3000/callback, Allowed logout URLs and web origins to http://localhost:3000
3. Copy the certificate from the Advanced Settings/Certificates and change it in backend/src/lambda/auth/auth0Authorizer
4. Change the domain and client ID in the client/src/pages/\_app
5. Deploy the backend with _sls deploy -v_, which starts the cloud formation
6. After the formation finished, get the API ID and put it into the client/src/config.ts
7. Start the frontend with _npm run dev_

## AWS Products used in the project:

* Cloud Formation
* API Gateway
* Lambda
* DynamoDB
* S3
* CloudWatch
* X-Ray
