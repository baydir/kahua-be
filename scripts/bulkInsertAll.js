import ModetikaConnection from './connection';

import insertProducts from './actions/products';

require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const connection = new ModetikaConnection({ ...config });


const exec = async () => {
  await connection.init();
  
  const dir = './scripts/data/';
  const fs = require('fs');
  let brandNames = []
  fs.readdirSync(dir).forEach(file => {
    const brandName = file.split(".json")[0];
    brandNames.push(brandName);
    if (brandNames.includes(".DS_Store")){
      brandNames.shift()
    }

  });


  await Promise.all(
    brandNames.map(async (brandName) => {
      await console.log(brandName);
      await insertProducts(brandName);
    })
  );

  
  process.exit(0);
};
exec();
