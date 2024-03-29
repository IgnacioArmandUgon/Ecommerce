import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { validations, jwt } from '../../../utils';

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
      return registerUser(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'La contraseña debe ser de minimo 6 caracteres' });
  }

  if (name.length < 2) {
    return res.status(400).json({ message: 'El nombre debe ser de minimo 2 caracteres' });
  }
  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: 'El correo no tiene un formato correcto' });
  }

  db.connect();
  const user = await User.findOne({ email });

  if (user) {
    db.disconnect();
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: 'Revisar logs del servidor' });
  }

  db.disconnect();
  const { role, _id } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role: 'client',
      name,
    },
  });
};
