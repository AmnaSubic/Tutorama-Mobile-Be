'use strict';
const products = require('../users');

module.exports.handler = async event => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Your function executed successfully!',
            data: products.products
        }),
    };

    //products.products
    //products.products.map((p) =>)

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
