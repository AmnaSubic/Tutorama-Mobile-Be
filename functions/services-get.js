'use strict';
const services = require('../data/services');
const subjects = require('../data/subjects');
const users = require('../data/users');

module.exports.handler = async event => {

    const equijoin = (xs, ys, primary, foreign, sel) => {
        const ix = xs.reduce((ix, row) => ix.set(row[primary], row), new Map);
        return ys.map(row => sel(ix.get(row[foreign]), row));
    };

    const result = equijoin(users.users, services.services, 'user', 'tutor',
        ({firstname, lastname}, {service, tutor, subject, level, cost}) => ({firstname, lastname, service, tutor, subject, level, cost}));

    const final =  equijoin(subjects.subjects, result, 'subject', 'subject',
        ({name}, {service, tutor, firstname, lastname, subject, level, cost}) => ({service, tutor, firstname, lastname, subject, name, level, cost}));


    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Your function executed successfully!',
            data: final
        }),
    };
};
