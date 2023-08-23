export default (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'group',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lable: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
      importance: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Group;
};
