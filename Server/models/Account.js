
var uuidv1  = require('uuid/v1');

module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {

        uuid: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          isUnique :true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:["^[a-z]+$",'i'],
                min:1,
                notEmpty:true
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:["^[a-z]+$",'i'],
                min:1,
                notEmpty:true
            }
        }
    });

    // accociations ======================

    Account.associate = function(models){
        Account.belongsTo(models.User, {
            foreignKey: "userUUID",
            onDelete: 'cascade'
        });
    };

    return Account;
}
