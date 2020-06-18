"use strict";
const { Sequelize} = require("sequelize");
const Class = require('../models/Class');
const Service = require('../models/Service');

const databaseConnection = new Sequelize("mysql://root:rootroot@localhost:3306/baza");

const s = Service.init(databaseConnection, Sequelize);
const c = Class.init(databaseConnection, Sequelize);
c.belongsTo(s, {foreignKey: 'service'});
s.hasMany(c);

module.exports.handler = async (event) => {
    try {
        const {id} = event.pathParameters;
        const classes = await c.findAll({
            attributes: {
                exclude: ['ServiceServiceID']
            },
            where: {
                student: parseInt(id)
            },
            include: [Service]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Your function executed successfully!",
                data: classes.map((c) => c.dataValues),
            }),
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: JSON.stringify({}) };
    }
};