"use strict";
const { Sequelize } = require("sequelize");

const databaseConnection = new Sequelize("mysql://root:rootroot@localhost:3306/baza");

const Class = require('../models/Class');
const c = Class.init(databaseConnection, Sequelize);


module.exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const newClass = c.build(body);
        await newClass.save();
        console.log(event.body);
        return {statusCode: 201, body: JSON.stringify({})};

    } catch (error) {
        console.log(error);
        return {statusCode: 500, body: JSON.stringify({})};
    }
}