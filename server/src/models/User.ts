import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
