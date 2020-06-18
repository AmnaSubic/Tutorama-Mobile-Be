"use strict";
const { Sequelize} = require("sequelize");
const Service = require('../models/Service');

const databaseConnection = new Sequelize("mysql://root:rootroot@localhost:3306/baza");
const s = Service.init(databaseConnection, Sequelize);

module.exports.handler = async (event) => {
    try {
        const {id} = event.pathParameters;
        const service = await s.findOne({
            where: {
                service_ID: parseInt(id)
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Your function executed successfully!",
                data: service,
            }),
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: JSON.stringify({}) };
    }
};