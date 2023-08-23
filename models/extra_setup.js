export default function applyExtraSetup(db) {
  db.user.hasMany(db.group, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  db.group.belongsTo(db.user, { foreignKey: 'user_id' });

  db.group.hasMany(db.category, {
    foreignKey: 'group_id',
    onDelete: 'CASCADE',
  });
  db.category.belongsTo(db.group, { foreignKey: 'group_id' });

  db.category.hasMany(db.task, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });
  db.task.belongsTo(db.category, { foreignKey: 'category_id' });
}
