const Sequelize = require('sequelize');

module.exports = class AuthCode extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            code:{
                type: Sequelize.STRING(10),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'AuthCode',
            tableName: 'authCodes',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.AuthCode.belongsTo(db.User, {
            foreignKey: 'userID', 
            targetKey:'web47ID'
        });
    }
}