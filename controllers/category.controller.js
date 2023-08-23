import db from '../models/index.js';
import { getGroupOwner } from './group.controller.js';

const Category = db.category;
export const create = async (req, res) => {
  const category = {
    lable: req.body.lable,
    group_id: req.body.group_id,
  };
  await Category.create(category)
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating the category.',
      });
    });
};

export const getAll = async (req, res) => {
  const { group_id } = req.query;
  await Category.findAll({
    where: [{ group_id: group_id }],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving categories.',
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  await Category.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({id});
      } else {
        res.status(401).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Category with id=' + id,
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Category.findOne({
    where: { id },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Category.',
      });
    });
};

export const edit = async (req, res) => {
  const id = req.params.id;
  await Category.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({body:req.body, id:id});
      } else {
        res.status(401).send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not update Category with id=' + id,
      });
    });
};


export const getCategoryOwner = async(id)=>{
  const category = await Category.findByPk(id);
  const user_id = await getGroupOwner(category.group_id)
  return user_id;
}