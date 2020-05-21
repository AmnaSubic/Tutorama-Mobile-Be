'use strict';
const classes = require('../data/classes');
const services = require('../data/services');
const subjects = require('../data/subjects');
const users = require('../data/users');

module.exports.handler = async (event) => {

    const equijoin = (xs, ys, primary, foreign, sel) => {
        const ix = xs.reduce((ix, row) => ix.set(row[primary], row), new Map);
        return ys.map(row => sel(ix.get(row[foreign]), row));
    };

    try {
        const {id} = event.pathParameters;
        const result1 = equijoin(services.services, classes.classes, 'service', 'service',
            ({subject, tutor, level}, {c, service, student, date, start, end, place, price}) => ({c, service, student, date, start, end, place, price, subject, tutor, level}));

        const result2 =  equijoin(subjects.subjects, result1, 'subject', 'subject',
            ({name}, {c, service, student, date, start, end, place, price, subject, tutor, level}) => ({c, service, student, date, start, end, place, price, subject, name, tutor, level}));

        const result3 = equijoin(users.users, result2, 'user', 'student',
            ({firstname, lastname}, {c, service, student, date, start, end, place, price, subject, name, tutor, level}) => ({c, service, student, date, start, end, place, price, subject, name, tutor, firstname, lastname, level}));

        const final = result3.filter((c) => c.tutor === parseInt(id))
        if (final.length > 0) {
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
