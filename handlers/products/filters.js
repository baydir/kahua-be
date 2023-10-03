import Product from '../../models/product';
import getQuery from './query';
import getQueryFilters from '../../helpers/filters';

const getCurrentFilters = async (request, response, next) => {
  try {
    const query = getQuery(request);
    const filters = await Product.aggregate(getQueryFilters(query));
    const result = filters[0];
    return response.json(
      result || {
        collections: { values: [] },
        sizes: { values: [] },
        products: { values: [] },
        brands: { values: [] },
        colors: { values: [] },
      }
    );
  } catch (error) {
    return next(
      new Error(`An error ocurred when obtaining filters. Error: ${error}`)
    );
  }
};

export default getCurrentFilters;
