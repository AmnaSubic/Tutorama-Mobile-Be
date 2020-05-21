'use strict';
const users = require('../data/users');

module.exports.handler = async (event) => {
    try {
        const { id } = event.pathParameters;
        const result = users.users.filter((u) => u.user === parseInt(id) && u.tutor === 1)
        if (result.length > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Your function executed successfully!',
                    data: result[0]
                }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Object not found!',
                    data: {}
                }),
            };
        }
    } catch(error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error!",
                data: {},
            }),
        };
    }

    //products.products
    //products.products.map((p) =>)

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
