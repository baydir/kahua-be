import { Types } from 'mongoose';

export const mapToObjectId = (id) =>
  Types.ObjectId.isValid(id) ? Types.ObjectId(id) : '';

export const valuesToObjectIds = (values) =>
  values.map((value) => mapToObjectId(value));
