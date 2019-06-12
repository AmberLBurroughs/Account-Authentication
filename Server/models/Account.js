const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        uuid: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
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
        address: DataTypes.STRING,
        latLng: DataTypes.STRING,
        photo: DataTypes.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    // accociations ======================
    Account.associate = (models) => {
        Account.belongsTo(models.User, {
            foreignKey: "userUUID",
            onDelete: 'cascade'
        });
    };

    return Account;
}
