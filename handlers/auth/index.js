import { sign } from 'jsonwebtoken';
import User from '../../models/user';

export const registerUser = async (request, response) => {
  const { name, email, password } = request.body;
  const user = new User({
    name,
    email,
    password,
  });
  try {
    await user.save();
  } catch (error) {
    return response.json({
      success: false,
      msg: 'User already exists.',
      error: error.message,
    });
  }
  return response.json({
    success: true,
    msg: 'Successfully created new user',
    user,
  });
};

export const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const token = sign(user.toJSON(), process.env.AUTH_SECRET, {
        expiresIn: 604800, // expires in 1 week
      });
      response.json({
        success: true,
        token: `Bearer ${token}`,
        // eslint-disable-next-line no-underscore-dangle
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      response.status(401).send({
        success: false,
        msg: 'Auth failed. Wrong password',
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      msg: 'An unexpected error ocurred',
      error: error.message,
    });
  }
};

export const logoutUser = (request, response) => {
  request.logout();
  response.json({ success: true, msg: 'Sign out succesfully.' });
};
