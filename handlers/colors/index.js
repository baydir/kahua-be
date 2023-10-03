import Color from '../../models/color';

export const createNewColor = async (request, response, next) => {
  const { name, rgb } = request.body;
  const deconstructedColor = rgb.split(',');
  const color = new Color({
    name,
    rgb: {
      r: deconstructedColor[0],
      b: deconstructedColor[1],
      g: deconstructedColor[2],
    },
  });
  try {
    const createdColor = await color.save();
    return response.json(createdColor);
  } catch (error) {
    return next(new Error(`Can't create Color. Error: ${error}`));
  }
};

export const getColors = async (request, response, next) => {
  try {
    const Colors = await Color.find({});
    return response.json(Colors);
  } catch (error) {
    return next(new Error(`Can't query Colors. Error: ${error}`));
  }
};

export const getColor = async (request, response, next) => {
  const { id } = request.params;
  try {
    const color = await Color.findById(id);
    return response.json(color);
  } catch (error) {
    return next(new Error(`Can't query Color. Error: ${error}`));
  }
};
