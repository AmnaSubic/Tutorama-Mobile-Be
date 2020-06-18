'use strict';
const { Model } = require("sequelize");

class Service extends Model {
    static init(sequelize, Sequelize) {
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

module.exports = Service;