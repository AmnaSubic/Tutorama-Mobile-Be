'use strict';
const services = require('../data/services');
const subjects = require('../data/subjects');

module.exports.handler = async (event) => {
    const equijoin = (xs, ys, primary, foreign, sel) => {
        const ix = xs.reduce((ix, row) => ix.set(row[primary], row), new Map);
        return ys.map(row => sel(ix.get(row[foreign]), row));
    };

    try {
        const {id} = event.pathParameters;
        const result = services.services.filter((s) => s.tutor === parseInt(id))
        const final =  equijoin(subjects.subjects, result, 'subject', 'subject',
            ({name}, {service, tutor, subject, level, cost}) => ({service, tutor, subject, name, level, cost}));
        if (result.length > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Your function executed successfully!',
                    data: final
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
