import Product from '../../models/product';
import Color from '../../models/color';
import Brand from '../../models/brand';

import { mapToObjectId } from '../../helpers/objectIds';

const insertProducts = async (brandName) => {
  try {
    let brand = await Brand.findOne({ name: brandName });

    if (!brand) {
      console.info(`Brand ${brandName} doesn't exist. Creating...`);
      brand = new Brand({
        name: brandName,
        account: '',
        numberClickMonth: 0,
      });
      await brand.save();
      console.info(`Saved brand ${brandName} with id ${brand._id}`);
    }
    const { default: products } = await import(`../data/${brandName}.json`);
    console.info(`Products to insert: ${products.length}`);
    await Promise.all(
      products.map(async (product) => {
        const colors = await Promise.all(
          product.colors.map(async (name) => {
            const { _id: colorId } = await Color.findOne({ name });
            console.info(`Parsing color ${name} to id => ${colorId}`);
            return mapToObjectId(colorId);
          })
        );
        const newProduct = new Product({
          ...product,
          images: [product.urlImage],
          brand: mapToObjectId(brand._id),
          colors,
          collectionName:
            product.collectionName.charAt(0).toUpperCase() +
            product.collectionName.slice(1),
        });
        await newProduct.save();
        console.info(`Product Saved => ${product.title}`);
      })
    );
  } catch (err) {
    throw new Error(`Error inserting products. ${err}`);
  }
};

export default insertProducts;
