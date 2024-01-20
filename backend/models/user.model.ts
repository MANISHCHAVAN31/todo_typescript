import mongoose, { Document, Schema } from "mongoose";

interface UserAttributes {
  username: string;
  email: string;
  password: string;
}

interface UserDocument extends Document, UserAttributes {}

const userSchema = new Schema<UserDocument>({
  username: { type: String, maxlength: 100, required: true, unique: true },
  email: { type: String, maxlength: 50, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
