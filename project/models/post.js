const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING,
                allowNull: true,
                //참고 : https://stackoverflow.com/questions/41860792/how-can-i-have-a-datatype-of-array-in-mysql-sequelize-instance
                get() {
                    let temp = this.getDataValue('img') != null ? this.getDataValue('img').split(';') : null;
                    //console.log('img get : ', temp);
                    return temp;
                },
                set(val) {
                    console.log('val : ', val);
                    let temp = val != null ? val.join(';') : null;
                    //console.log('img set : ', temp);
                    this.setDataValue('img', temp);
                },
            }
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
        db.Post.belongsToMany(db.Hashtag, { through: 'posthashtag' });
    }
};