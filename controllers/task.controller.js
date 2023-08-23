import category from '../models/category.js';
import db from '../models/index.js';
import { getGroupOwner } from './group.controller.js';

const Task = db.task;
const Category = db.category;
const Group = db.group;
export const create = async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    deadline_date: req.body.deadline_date,
    importance: req.body.importance,
    category_id: req.body.category_id,
  };

  await Task.create(task)
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating the Role.',
      });
    });
};

export const getAll = async (req, res) => {
  const { group_id } = req.query;
  await Task.findAll({
    include: [
      {
        model: Category,
        where: { group_id: group_id },
      },
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tasks.',
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  await Task.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({id});
      } else {
        res.status(401).send({
          message: `Cannot delete task with id=${id}. Maybe task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete task with id=' + id,
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Task.findOne({
    where: { id },
    include:{
      model:Category,
      include:Group
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving task.',
      });
    });
};

export const edit = async (req, res) => {
  const id = req.params.id;
  await Task.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({body:req.body, id:id});
      } else {
        res.status(401).send({
          message: `Cannot update task with id=${id}. Maybe task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not update task with id=' + id,
      });
    });
};

export const getTaskOwner = async (id) => {
  const task = await Task.findByPk(id);
  const category = await Category.findByPk(task.category_id);
  const user_id = await getGroupOwner(category.group_id);
  return user_id;
};
