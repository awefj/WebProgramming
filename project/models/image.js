const Sequelize = require('sequelize');
module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            img: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            index: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Image',
            tableName: 'images',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Image.belongsTo(db.Post);
        //foreignkey 옵션을 지정하지 않아서 알아서 PostId foreignkey column을 생성.
    }
};