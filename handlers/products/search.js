import { isString } from 'lodash';
import { Types } from 'mongoose';
import { mapToObjectId } from '../../helpers/objectIds';
import Product from '../../models/product';
import getQuery from './query';

const search = async (request, response, next) => {
  const query = getQuery(request);
  const { productIds } = request.body;
  const { pg = 1, l = 50, ...filters } = request.query;
  let page = pg;
  let limit = l;

  page = isString(page) ? Number(page) || 1 : 1;
  page = page > 0 ? page : 1;
  limit = isString(limit) ? Number(limit) || 50 : 50;
  limit = limit > 0 ? limit : 50;

  try {
    let products = [];
    const count = await Product.count(query);
    const pages = Math.ceil(count / limit);
    if (page <= pages) {
      const aggr = [
        {
          $match:
            productIds && productIds.length > 0
              ? {
                  ...query,
                  _id: { $nin: productIds.map((id) => Types.ObjectId(id)) },
                }
              : query,
        },
        {
          $sample: { size: limit },
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brand',
          },
        },
        { $unwind: '$colors' },
        {
          $lookup: {
            from: 'colors',
            localField: 'colors',
            foreignField: '_id',
            as: 'colors',
          },
        },
        { $unwind: '$colors' },
        { $unwind: '$brand' },
        {
          $group: {
            _id: '$_id',
            colors: { $push: '$colors' },
            data: { $first: '$$ROOT' },
          },
        },
        {
          $project: {
            _id: '$data._id',
            colors: '$colors',
            sizes: '$data.sizes',
            images: '$data.images',
            title: '$data.title',
            description: '$data.description',
            collectionName: '$data.collectionName',
            category: '$data.category',
            subcategory: '$data.subcategory',
            url: '$data.url',
            price: '$data.price',
            brand: '$data.brand',
            offer: {
              $gt: ['$data.price.previous', '$data.price.actual'],
            },
            colorScore: {
              $reduce: {
                input: '$colors',
                initialValue: 0,
                in: {
                  $cond: {
                    if: {
                      $in: [
                        '$$this._id',
                        filters && filters.c
                          ? filters.c.map((c) => mapToObjectId(c))
                          : [],
                      ],
                    },
                    then: { $sum: ['$$value', 1] },
                    else: { $sum: ['$$value', 0] },
                  },
                },
              },
            },
          },
        },
        { $sort: { colorScore: -1 } },
      ];
      products = await Product.aggregate(aggr);
    }
    return response.json({
      data: products,
      pagination: {
        limit,
        item_count: count,
        page_count: products.length,
        total_pages: pages,
        page,
      },
    });
  } catch (error) {
    return next(new Error(`Can't query Products. Error: ${error}`));
  }
};

export default search;
