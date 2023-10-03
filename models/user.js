import { hash as _hash, compare } from 'bcrypt';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    favoriteProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const hashPassword = async (password, saltRounds) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    _hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

UserSchema.pre('save', async function preSave() {
  const user = this;
  if (user.isNew) {
    const saltRounds = 10;
    const hashedPassword = await hashPassword(user.password, saltRounds);
    user.password = hashedPassword;
  }
});

UserSchema.methods.comparePassword = function comparePassword(password) {
  return compare(password, this.password);
};

export default model('user', UserSchema);
