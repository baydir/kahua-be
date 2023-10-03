import { model, Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: String,
    description: String,
    collectionName: String,
    category: String,
    subcategory: String,
    url: String,
    clicks: Number,
    price: {
      actual: Number,
      previous: Number,
      currency: String,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'brand',
    },
    colors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'color',
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model('product', ProductSchema);
