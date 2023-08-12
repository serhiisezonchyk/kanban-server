import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';
import {compareSync, hash} from 'bcrypt'
import db from '../models/index.js';

const User = db.user;
const generateJwt = (id, email, firstName, lastName) => {
  return jwt.sign({ id, email, firstName, lastName }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    return next(ApiError.internal('Incorrect login or password.'));
  }
  let comparePassword = compareSync(password, user.password);
  if (!comparePassword)
    return next(ApiError.internal('Incorrect login or password.'));

  const token = generateJwt(user.id, user.email, user.first_name, user.last_name);
  res.status(200).send({ token });
};

export const check = async(req, res, next)=>{
    const token = generateJwt(req.user.id, req.user.email, req.user.first_name, req.user.last_name);
    res.status(200).send({token});
}

export const create = async(req, res, next)=>{
    const newUser={
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar_url: req.body.lastName,
        country: req.body.country,
        phone: req.body.phone,
    }

    await User.findOne({where:{email: newUser.email}}).then((candidate)=>{
        if(candidate){
            return next(ApiError.badRequest("THIS USER IS ALREADY EXIST."));
        }
    })

    const hashPassword = await hash(newUser.password, 5);
    newUser.password = hashPassword;
    await User.create(newUser).then((data)=>{
      res.status(200).send(data);
    }).catch((error)=>{
        res.status(500).send({message: error.message || 'Some error occured while creating the user.'})
    })
}