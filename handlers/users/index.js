import User from '../../models/user';

export const getUsers = async (_, response) => {
  const users = await User.find({})
    .select('-password')
    .populate('favoriteProducts');
  response.json(users);
};

export const toggleFavorite = async (request, response) => {
  const { productId, userId } = request.body;

  const user = await User.findById(userId).select('-password');

  const productIdIndex = user.favoriteProducts.indexOf(productId);

  if (productIdIndex === -1) {
    user.favoriteProducts.push(productId);
  } else {
    user.favoriteProducts.splice(productIdIndex, 1);
  }

  await user.save();
  await user.populate('favoriteProducts');

  return response.json(user.favoriteProducts);
};

export const getUserFavorites = async (request, response) => {
  const { userId } = request.params;
  const user = await User.findById(userId).populate('favoriteProducts');
  response.json(user.favoriteProducts);
};
