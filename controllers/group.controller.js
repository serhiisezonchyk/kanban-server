import db from '../models/index.js';
const Group = db.group;
export const create = async (req, res) => {
  const group = {
    lable: req.body.lable,
    user_id: req.body.user_id,
    importance: req.body.importance,
    description:req.body.description,
  };

  await Group.create(group)
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating the group.',
      });
    });
};

export const getAll = async (req, res) => {
  const user_id  = req.user_id;
  await Group.findAll({
    where: [{ user_id: user_id }],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving groups.',
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  await Group.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({id});
      } else {
        res.status(401).send({
          message: `Cannot delete group with id=${id}. Maybe group was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete group with id=' + id,
      });
    });
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  await Group.findOne({
    where: { id },
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

  await Group.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({body:req.body, id:id});
      } else {
        res.status(401).send({
          message: `Cannot update Group with id=${id}. Maybe Group was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not update Group with id=' + id,
      });
    });
};

export const getGroupOwner = async(id)=>{
  const group = await Group.findByPk(id);
  return group.user_id;
}