'use strict';
const users = require('../data/users');

module.exports.handler = async event => {
    try {
        const result = users.users.filter((u) => u.istutor === 1)
        if (result.length > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Your function executed successfully!',
                    data: result
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
                message: 'Internal Server Error!',
                data: {},
            }),
        };
    }

};
