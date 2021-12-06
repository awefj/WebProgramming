const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            img0: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            img1: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            img2: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            img3: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            img4: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    }
};