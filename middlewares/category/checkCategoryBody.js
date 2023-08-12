import jwt from 'jsonwebtoken';
import { getGroupOwner } from '../../controllers/groupController.js';

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
      
      const group_id = req.body?.group_id;

      getGroupOwner(group_id).then((user_id) => {
        if (decoded.id == user_id) next()
        else res.status(401).json({ message: ' No access' });
      })
      .catch(() => res.status(401).json({ message: ' No access' }));

    } catch (e) {
      res.status(401).json({ message: ' No access' });
    }
  }
  