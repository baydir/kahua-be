import Product from '../../models/product';
import Brand from '../../models/brand';

const onClick = async (request, response, next) => {
  const { id } = request.params;
  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      return next(new Error(`Product with id ${id} not found.`));
    }
    const brand = await Brand.findById({ _id: product.brand });
    if (!brand) {
      return next(new Error(`Brand with id ${id} not found.`));
    }
    brand.clicks += 1;
    product.clicks += 1;
    await product.save();
    await brand.save();
    return response.json(product);
  } catch (error) {
    return next(
      new Error(`Can't click Product with id ${id}. Error: ${error}`)
    );
  }
};

export default onClick;
