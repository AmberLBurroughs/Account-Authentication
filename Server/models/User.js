const Sequelize = require("sequelize");
const bcrypt  = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        uuid: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          isUnique :true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique :true,
            validate: {
                isEmail: true,
                min: 5
            }
        },
        local_pw: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                min:6
            }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE

    });

    // methods ======================
    // generating pw hash
    User.generateHash = (password) => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };
    
    // validate pw
    User.validPassword = (password) => {
      return bcrypt.compareSync(password, this.local_pw);
    };

    // accociations ======================
    User.associate = (models) => {
        User.hasOne(models.Account, {
            foreignKey: "accountUUID",
            onDelete: "cascade"
        });
    };

    return User;
}
