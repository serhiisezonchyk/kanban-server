import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неправильний формат пошти.').isEmail(),
  body('password', 'Пароль повинен бути мінімум 7 сімволів.').isLength({
    min: 7,
  }),
  body('first_name', 'Введіть своє ім`я.').notEmpty(),
  body('last_name', 'Введіть своє прізвище.').notEmpty(),
  body('avatar_url', 'Неправильний формат URL аватару.').optional().isURL(),
  body('country', 'Введіть свою країну.').notEmpty(),
  body('phone', 'Введіть свій номер телефону.').notEmpty(),
];

export const groupValidation = [
  body('label', 'Введіть назву групи.').notEmpty(),
];

export const categoryValidation = [
  body('label', 'Введіть назву колонки.').notEmpty(),
];

export const taskValidation = [
  body('title', 'Введіть назву задачі.').notEmpty(),
  body('description', 'Неправильний формат опису.').optional().isString(),
  body('deadline_date', 'Неправильний формат дати.').optional().isISO8601(),
  body('importance', 'Неправильний формат важливості.').optional().isBoolean(),
];
