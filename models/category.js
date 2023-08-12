export default (sequelize, DataTypes) => {
    const Category = sequelize.define(
      'category',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        label: { type: DataTypes.STRING, allowNull: false },
      },
      { freezeTableName: true, timestamps: false }
    );
    return Category;
  };
  