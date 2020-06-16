"use strict";
const { Sequelize, Model } = require("sequelize");

const databaseConnection = new Sequelize("mysql://root:rootroot@localhost:3306/baza");

class User extends Model {
    static init(sequelize) {
        return super.init({
                user_ID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                firstName: Sequelize.STRING,
                lastName: Sequelize.STRING,
                dob: Sequelize.DATE,
                gender: Sequelize.BOOLEAN,
                address: Sequelize.STRING,
                town: Sequelize.STRING,
                country: Sequelize.STRING,
                phone: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING
            },
            {
                tableName: "users",
                sequelize: sequelize,
                timestamps: false,
            }
        );
    }
}

module.exports.handler = async (event) => {
    try {
        const {e} = event.pathParameters;
        const user = await User.init(databaseConnection);
        const users = await user.findOne({
            where: {
                email: e
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Your function executed successfully!",
                data: users,
            }),
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: JSON.stringify({}) };
    }
};