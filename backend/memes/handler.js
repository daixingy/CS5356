'use strict';

// const { project } = require("ramda");

const firebaseTokenVerifier = require("firebase-token-verifier");
const { project } = require("ramda");
// const projectId = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjOGUyYjI5NmM2ZjMyODRlYzMwYjg4NjVkNzI5M2U2MjdmYTJiOGYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiV2VudGFvIFh1IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3J5YW4tNjg3ODMiLCJhdWQiOiJyeWFuLTY4NzgzIiwiYXV0aF90aW1lIjoxNjE5Mjk0NzcyLCJ1c2VyX2lkIjoiWnBwQlhCV1VuR1lmUGNYUjV2ZWtRdmI2OUJwMiIsInN1YiI6IlpwcEJYQldVbkdZZlBjWFI1dmVrUXZiNjlCcDIiLCJpYXQiOjE2MTkyOTQ3NzIsImV4cCI6MTYxOTI5ODM3MiwiZW1haWwiOiIxODMyMTI4NjIxMUAxNjMuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjE4MzIxMjg2MjExQDE2My5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.WqKXA7nN3X8Y3T0dtmKOHPr0uvS1K1ki-x9Oe6MOX1MldqZA1ma_pRSoohE4CPnHTz0b01-8BqwNGLUv5yinVDFJKoh6eeWR5hhNssTwoY4o5fSQT48SJCwDgMvQyIc-29r_n-yAQbjLvVhz8dICczwkSoKqVzwK6i2oerrYqRBcOVJhOyh1gvptB5g2jByWkbMVHkhXfeLlzjF7QWtbg_3VReLI3HbalFo7ZkuxksgSZOPBU1sOtCQOwnVG5y0QW5QDcglOfdj-J6estgdhng566Tl6Uh_j-aJwUKmz_8Yyj1SUTAEBapXK4NR7G8KcWhxmac93xKWD4R9xmN7TRA"
const projectId = "meme-8f992"

module.exports.hello = async (event) => {
  if (event.path === '/orders'&& event.httpMethod === 'GET'){
    const token = event.headers['Authorization']
    // If no token is provided, or it is "", return a 401
    if (!token) {
      return {
        statusCode: 401
      }
    }

    // projectId = "asdasasdasdf"
    
    try {
      // validate the token from the request
      const decoded = await firebaseTokenVerifier.validate(token, projectId)
    } catch (err) {
      // the token was invalid,
      console.error(err)
      return {
        statusCode: 401
      }
  }

  return {
    statusCode: 200,
    body: JSON.stringify([{id: 'Ash', status: "hungry"}])
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
}

// module.exports.orders = async (event) => {
//   // You'll only receive events for GET /feed requests
//   return {
//     statusCode: 200,
//     body: JSON.stringify([{username: 'da335', message: 'building stuff is cool'}])
//   }
// };


// module.exports.hello = async (event) => {
//   if (event.httpMethod === 'GET' && event.path === '/feed') {
//     return {
//       statusCode: 200,
//       body: JSON.stringify([{username: 'da335', message: 'building stuff is cool'}])
//     }
//   }
// }