
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
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                notEmpty:true
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min:1,
                notEmpty:true
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:["^[a-z]+$",'i'],
                min: 1,
                notEmpty:true
            }
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                not: ["[a-z]",'i'],
                min: 1,
                notEmpty:true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isInt: true,
                not: ["[a-z]",'i'],
                len: [10],
                notEmpty:true
            }
        }
    });
    // methods ======================

    Account.associate = function(models){
        Account.belongsTo(models.User, {
            foreignKey: "userUUID"
        });
    };

    return Account;
}
