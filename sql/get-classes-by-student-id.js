"use strict";
const { Sequelize, Model } = require("sequelize");

const databaseConnection = new Sequelize("mysql://root:rootroot@localhost:3306/baza");

class Class extends Model {
    static init(sequelize) {
        return super.init({
                class_ID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                service: Sequelize.INTEGER,
                student: Sequelize.INTEGER,
                date: Sequelize.DATE,
                start: Sequelize.TIME,
                end: Sequelize.TIME,
                price: Sequelize.FLOAT,
                place: Sequelize.STRING,
                status: Sequelize.ENUM('started', 'cancelled', 'finished')

            },
            {
                tableName: "classes",
                sequelize: sequelize,
                timestamps: false,
            }
        );
    }
}

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

class Tutor extends Model {
    static init(sequelize) {
        return super.init({
                tutor_ID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: Sequelize.STRING,
                surname: Sequelize.STRING,
                dob: Sequelize.DATE,
                gender: Sequelize.BOOLEAN,
                address: Sequelize.STRING,
                town: Sequelize.STRING,
                country: Sequelize.STRING,
                phone: Sequelize.STRING,
                email: Sequelize.STRING,

            },
            {
                tableName: "tutors",
                sequelize: sequelize,
                timestamps: false,
            }
        );
    }
}

module.exports.handler = async (event) => {
    try {
        const {id} = event.pathParameters;
        const c = await Class.init(databaseConnection);
        const classes = await c.findAll({
            where: {
                student: parseInt(id)
            }
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