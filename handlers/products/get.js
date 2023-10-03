import Product from '../../models/product';

export const getProducts = async (request, response, next) => {
  try {
    const products = await Product.find({})
      .populate('brand')
      .populate('colors');
    return response.json(products);
  } catch (error) {
    return next(new Error(`Can't query Products. Error: ${error}`));
  }
};

export const getProduct = async (request, response, next) => {
  const { id } = request.params;
  try {
    const product = await Product.findById(id)
      .populate('brand')
      .populate('colors');
    return response.json(product);
  } catch (error) {
    return next(new Error(`Can't query Product. Error: ${error}`));
  }
};
