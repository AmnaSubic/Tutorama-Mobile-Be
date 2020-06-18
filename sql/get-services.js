"use strict";
const { Sequelize } = require("sequelize");
const Service = require('../models/Service');
const databaseConnection = new Sequelize("mysql://root:rootroot@localhost:3306/baza");

const s = Service.init(databaseConnection, Sequelize);

module.exports.handler = async (event) => {
    try {

        const services = await s.findAll();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Your function executed successfully!",
                data: services,
            }),
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: JSON.stringify({}) };
    }
};