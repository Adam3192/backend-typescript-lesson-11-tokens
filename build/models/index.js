"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const message_1 = require("./message");
const user_1 = require("./user");
const dbName = 'messageDB';
const username = 'sqluser';
const password = 'password';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, user_1.UserFactory)(sequelize);
(0, message_1.MessageFactory)(sequelize);
(0, message_1.AssociateUserMessage)();
exports.db = sequelize;
