'use strict';
const products = require('../users');

module.exports.handler = async (event) => {
    try {
        const newProduct = JSON.stringify(event.body);
        const newNewProduct = {
            Name: newProduct.Name,
            Price: newProduct.Price,
            Location: newProduct.Location,
            Id: products.products.length + 1
        };
        products.products.push(newNewProduct);

        if (!newProduct.Name) {
            return {
                statusCode: 422,
                body: JSON.stringify({
                    message: "Name is missing from request body!",
                    data: {}
                })
            }
        };

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Your function executed successfully!',
                data: "Saved!"
            }),
        };

    } catch (error) {
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