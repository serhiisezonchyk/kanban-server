export default (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'group',
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
  return Group;
};
