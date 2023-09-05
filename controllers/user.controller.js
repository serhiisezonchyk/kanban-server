import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';
import { compareSync, hash } from 'bcrypt';
import db from '../models/index.js';
import { createNote } from './note.controller.js';

const User = db.user;
const generateJwt = (id, email, first_name, last_name) => {
  return jwt.sign(
    { id, email, first_name, last_name },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  );
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    return res.status(400).send({ message: 'Incorrect login or password.' });
  }
  let comparePassword = compareSync(password, user.password);
  if (!comparePassword)
    return res.status(400).send({ message: 'Incorrect login or password.' });

  const token = generateJwt(
    user.id,
    user.email,
    user.first_name,
    user.last_name
  );
  return res.status(200).send({ token });
};

export const check = async (req, res, next) => {
  console.log(req.user);
  const token = generateJwt(
    req.user.id,
    req.user.email,
    req.user.first_name,
    req.user.last_name
  );
  return res.status(200).send({ token });
};

export const create = async (req, res, next) => {
  await User.findOne({ where: { email: req.body.email } }).then((candidate) => {
    if (candidate) {
      return res.status(400).send({ message: 'This user is already exist.' });
    }
  });
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    avatar_url: req.body.avatar_url,
    country: req.body.country,
    phone: req.body.phone,
  };

  const hashPassword = await hash(newUser.password, 5);
  newUser.password = hashPassword;

  await User.create(newUser)
    .then((data) => {
      const token = generateJwt(
        data.id,
        data.email,
        data.first_name,
        data.last_name
      );

      createNote({ user_id: data.id });
      return res.status(200).send({ token });
    })
    .catch((error) => {
      return res.status(400).send({ message: error.message });
    });
};
