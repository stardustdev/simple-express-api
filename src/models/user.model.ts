import { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  age: number;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});

export const UserModel = model<UserDocument>('User', UserSchema);
