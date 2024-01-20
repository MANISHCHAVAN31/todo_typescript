import mongoose, { Schema } from "mongoose";

interface todoAttributes {
  title: string;
  is_deleted: boolean;
  created_date: Date;
  expiry_date?: Date; // Making expiry_date optional
  created_by: Schema.Types.ObjectId;
}

const todoSchema = new mongoose.Schema<todoAttributes>({
  title: {
    type: String,
    maxlength: 200,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  expiry_date: {
    type: Date,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const todoModel = mongoose.model<todoAttributes>("Todo", todoSchema);

export default todoModel;
