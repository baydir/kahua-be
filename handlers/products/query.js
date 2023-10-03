/* eslint-disable no-param-reassign */
import { isArray, isEmpty, isNil, isString } from 'lodash';
import { valuesToObjectIds } from '../../helpers/objectIds';

const getQuery = (request) => {
  if (isEmpty(request.query)) {
    return {};
  }
  const {
    q: term = '',
    c: colors = [],
    b: brand = [],
    col: collectionName = [],
    s: sizes = [],
    p: product = [],
    pr: priceRange,
  } = request.query;

  const queryMap = {
    colors: valuesToObjectIds(isString(colors) ? [colors] : colors),
    brand: valuesToObjectIds(isString(brand) ? [brand] : brand),
    collectionName,
    sizes,
    subcategory: product,
    priceRange,
  };

  const searchTerms = Object.keys(queryMap)
    // filter empty (or in the case of ids, invalid) search terms
    .filter((key) => !isEmpty(queryMap[key]))
    // map keys to actual search term object to use in query
    .reduce((obj, key) => {
      // Special cases
      if (key === 'priceRange' && !isNil(queryMap.priceRange)) {
        const [priceMin, priceMax] = queryMap.priceRange.split('-');
        obj['price.actual'] = {
          $gte: parseFloat(priceMin),
          $lte: parseFloat(priceMax),
        };
        return obj;
      }

      // default object map
      obj[key] = {
        $in: isArray(queryMap[key]) ? queryMap[key] : [queryMap[key]],
      };
      return obj;
    }, {});

  return {
    ...searchTerms,
    $or: [
      { title: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } },
      { collectionName: { $regex: term, $options: 'i' } },
      { category: { $regex: term, $options: 'i' } },
      { subcategory: { $regex: term, $options: 'i' } },
    ],
  };
};

export default getQuery;
