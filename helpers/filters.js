/** Sanitizes a given match query to not include themselves based on a provided prop */
const sanitizeMatch = (query, prop) => {
  const { [prop]: omit, ...items } = query;
  return items;
};

const getQueryFilters = (query) => {
  return [
    {
      $facet: {
        collections: [
          { $unwind: '$collectionName' },
          {
            $match: sanitizeMatch(query, 'collectionName'),
          },
          {
            $group: {
              _id: null,
              values: { $addToSet: '$collectionName' },
            },
          },
        ],
        sizes: [
          { $unwind: '$sizes' },
          {
            $match: sanitizeMatch(query, 'sizes'),
          },
          {
            $group: {
              _id: null,
              values: { $addToSet: { $toUpper: '$sizes' } },
            },
          },
        ],
        products: [
          {
            $match: sanitizeMatch(query, 'subcategory'),
          },
          {
            $group: {
              _id: null,
              values: { $addToSet: '$category' },
            },
          },
          { $sort: { values: -1 } },
        ],
        brands: [
          { $match: sanitizeMatch(query, 'brand') },
          {
            $lookup: {
              from: 'brands',
              localField: 'brand',
              foreignField: '_id',
              as: 'values',
            },
          },
          { $unwind: '$values' },
          { $sort: { 'values.name': -1 } },
          {
            $group: {
              _id: null,
              values: { $addToSet: '$values' },
            },
          },
        ],
        colors: [
          {
            $match: sanitizeMatch(query, 'colors'),
          },
          {
            $lookup: {
              from: 'colors',
              localField: 'colors',
              foreignField: '_id',
              as: 'values',
            },
          },
          { $unwind: '$values' },
          { $sort: { 'values.name': -1 } },
          {
            $group: {
              _id: null,
              values: { $addToSet: '$values' },
            },
          },
        ],
        priceRange: [
          { $unwind: '$price' },
          {
            $match: sanitizeMatch(query, 'priceRange'),
          },
          {
            $group: {
              _id: null,
              min: { $min: '$price.actual' },
              max: { $max: '$price.actual' },
            },
          },
          { $unwind: '$min' },
          { $unwind: '$max' },
        ],
      },
    },
    { $unwind: '$collections' },
    { $unwind: '$brands' },
    { $unwind: '$colors' },
    { $unwind: '$sizes' },
    { $unwind: '$products' },
    { $unwind: '$priceRange' },
  ];
};

export default getQueryFilters;
