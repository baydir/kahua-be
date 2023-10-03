import { model, Schema } from 'mongoose';

const BrandSchema = new Schema(
  {
    name: String,
    clicks: Number,
    account: String,
  },
  {
    timestamps: true,
  }
);

export default model('brand', BrandSchema);
