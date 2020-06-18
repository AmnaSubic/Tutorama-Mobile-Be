'use strict'
const {Model} = require('sequelize');

class Class extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
                class_ID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                service: {
                    type: Sequelize.INTEGER,
                    //references: 'services',
                    //referencesKey: 'service_ID'
                },
                student: Sequelize.INTEGER,
                date: Sequelize.DATE,
                start: Sequelize.TIME,
                end: Sequelize.TIME,
                price: Sequelize.FLOAT,
                place: Sequelize.STRING,
                status: {
                    type: Sequelize.ENUM('cancelled', 'finished'),
                    allowNull: true
                }

            },
            {
                tableName: "classes",
                sequelize: sequelize,
                timestamps: false,
            }
        );
    }
}



module.exports = Class;