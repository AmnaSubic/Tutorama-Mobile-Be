"use strict";
const { Sequelize, Model } = require("sequelize");

const databaseConnection = new Sequelize("mysql://root:rootroot@localhost:3306/baza");

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
        const t = await Tutor.init(databaseConnection);
        const tutor = await t.findOne({
            where: {
                tutor_ID: parseInt(id)
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Your function executed successfully!",
                data: tutor,
            }),
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: JSON.stringify({}) };
    }
};