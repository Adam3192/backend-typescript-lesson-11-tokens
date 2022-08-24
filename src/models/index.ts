import { Sequelize } from "sequelize";
import { AssociateUserMessage, MessageFactory } from "./message";
import { UserFactory } from "./user";

const dbName = 'messageDB';
const username = 'sqluser';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);
MessageFactory(sequelize);
AssociateUserMessage();

export const db = sequelize;