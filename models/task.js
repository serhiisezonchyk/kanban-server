export default (sequelize, DataTypes) => {
    const Task = sequelize.define(
      'task',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: { type: DataTypes.STRING,  allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
        deadline_date:{type: DataTypes.DATE, allowNull:true},
        importance:{type: DataTypes.BOOLEAN, allowNull:true, defaultValue:false},
      },
      { freezeTableName: true,
        timestamps:true,
        createdAt: 'created_at', 
        updatedAt: 'updated_at', }
    );
    return Task;
  };
  