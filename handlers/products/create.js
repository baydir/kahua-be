import Product from '../../models/product';
import { mapToObjectId } from '../../helpers/objectIds';

export const createNewProduct = async (request, response, next) => {
  const product = new Product({
    ...request.body,
    brand: mapToObjectId(request.body.brand),
    colors: request.body.colors
      ? request.body.colors.map((color) => mapToObjectId(color))
      : [],
  });
  try {
    const createdProduct = await product.save();
    return response.json(createdProduct);
  } catch (error) {
    return next(new Error(`Can't create Product. Error: ${error}`));
  }
};

export const createProductsFromBulk = async (request, response, next) => {
  try {
    const { products } = request.body;
    return await Promise.all(
      products.map(async (product) => {
        const productModel = new Product({
          ...product,
          brand: mapToObjectId(product.brand),
          colors: product.colors
            ? product.colors.map((color) => mapToObjectId(color))
            : [],
        });
        await productModel.save();
        return response.json({ status: 'successful' });
      })
    );
  } catch (error) {
    return next(new Error(`Can't create Product. Error: ${error}`));
  }
};
