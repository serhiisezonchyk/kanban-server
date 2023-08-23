import jwt from 'jsonwebtoken';
import { getCategoryOwner } from '../../controllers/category.controller.js';

export default function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No access' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    getCategoryOwner(req.params?.id)
      .then((user_id) => {
        if (decoded.id == user_id) next();
        else res.status(401).json({ message: ' No access' });
      })
      .catch(() => res.status(401).json({ message: ' No access' }));
  } catch (e) {
    res.status(401).json({ message: ' No access' });
  }
}
