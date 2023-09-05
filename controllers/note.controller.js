import db from '../models/index.js';
const Note = db.note;
export const createNote = async (note) => {
  await Note.create(note);
};

export const getOne = async (req, res) => {
  const user_id = req.body.user_id;
  await Note.findOne({
    where: [{ user_id}],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving note.',
      });
    });
};

export const edit = async (req, res) => {
  const {user_id, text} = req.body;
  await Note.update({text}, { where: { user_id: user_id} })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({ body: {text}, user_id: user_id });
      } else {
        res.status(401).send({
          message: `Cannot update Note!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not update note.',
      });
    });
};
