"use strict";
const { Sequelize, Model } = require("sequelize");

const databaseConnection = new Sequelize("mysql://root:rootroot@localhost:3306/baza");

class Service extends Model {
    static init(sequelize) {
        return super.init({
                service_ID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement:true
                },
                tutor: Sequelize.INTEGER,
                subject: Sequelize.STRING,
                level: Sequelize.ENUM('elementary', 'highschool', 'university'),
                price: Sequelize.INTEGER
            },
            {
                tableName: "services",
                sequelize: sequelize,
                timestamps: false,
            }
        );
    }
}

module.exports.handler = async (event) => {
    try {
        const s = await Service.init(databaseConnection);
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