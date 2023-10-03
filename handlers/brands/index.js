import Brand from '../../models/brand';

export const createNewBrand = async (request, response, next) => {
  const { name, numberClickMonth, account } = request.body;
  const brand = new Brand({ name, account, numberClickMonth });
  try {
    const createdBrand = await brand.save();
    return response.json(createdBrand);
  } catch (error) {
    return next(new Error(`Can't create brand. Error: ${error}`));
  }
};

export const getBrands = async (request, response, next) => {
  try {
    const brands = await Brand.find({});
    return response.json(brands);
  } catch (error) {
    return next(new Error(`Can't query brands. Error: ${error}`));
  }
};

export const getBrand = async (request, response, next) => {
  const { id } = request.params;
  try {
    const brand = await Brand.findById(id);
    return response.json(brand);
  } catch (error) {
    return next(new Error(`Can't query brand. Error: ${error}`));
  }
};
