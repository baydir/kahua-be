import { model, Schema } from 'mongoose';

const ColorSchema = new Schema(
  {
    name: String,
    rgb: {
      r: Number,
      g: Number,
      b: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default model('color', ColorSchema);
