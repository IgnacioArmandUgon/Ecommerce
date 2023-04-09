// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt } from '../../../utils';

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return validateToken(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const validateToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.headers;

  let userId = '';
  try {
    userId = await jwt.isValidToken(token.toString());
  } catch (error) {
    return res.status(400).json({ message: 'Token de autorización no valido' });
  }

  db.connect();

  const user = await User.findById(userId).lean();

  db.disconnect();

  //   return res.status(400).json({ message: 'Bien' });

  if (!user) {
    return res.status(400).json({ message: 'No existe usuario con ese ID' });
  }

  const { email, name, role, _id } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      email,
      role,
      name,
    },
  });
};
