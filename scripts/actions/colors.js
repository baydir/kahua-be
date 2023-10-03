import Color from '../../models/color';

const insertColors = async () => {
  try {
    const { default: colors } = await import('../data/colors.json');
    await Promise.all(
      colors.map(async (color) => {
        const newColor = new Color(color);
        await newColor.save();
        console.info(`Saved ${color.name}`);
      })
    );
  } catch (error) {
    console.error('There was an error inserting colors: ', error);
  }
};

export default insertColors;
