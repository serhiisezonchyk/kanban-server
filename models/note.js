export default (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'note',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Note;
};
