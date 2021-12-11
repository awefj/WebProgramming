const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            imgs: { //이미지 여러개 주소를 ';' 로 분리. 출처: https://stackoverflow.com/questions/41860792/
                type: Sequelize.STRING,
                allowNull: true,
                get() { return this.getDataValue('imgs').split(';') },
                set(val) { this.setDataValue('imgs', val.join(';')); },
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