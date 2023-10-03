import ModetikaConnection from './connection';

import insertColors from './actions/colors';
import insertProducts from './actions/products';

require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const connection = new ModetikaConnection({ ...config });
const { cli } = connection;

const insertPrompt = {
  type: 'list',
  name: 'collection',
  message: `In which collection do you want to save data?
  Data needs to be stored inside "scripts/data" in order to be read.
  JSON objects are case sensitive.`,
  choices: ['Products', 'Colors'],
};

const exec = async () => {
  await connection.init();

  const { collection } = await cli.prompt([{ ...insertPrompt }]);
  const actions = {
    products: async () => {
      const { brandName } = await cli.prompt([
        { name: 'brandName', message: 'Enter the brand name: ' },
      ]);
      await insertProducts(brandName);
    },
    colors: insertColors,
  };

  await actions[collection.toLowerCase()]();
  console.info('Done! Bye :)!');
  process.exit(0);
};

exec();
