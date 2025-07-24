import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document
export interface IUser extends Document {
  name: string;
  dob: Date;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define User schema
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name must be less than 50 characters']
  },
  dob: {
    type: Date,
    required: [true, 'Date of Birth is required'],
    validate: {
      validator: (value: Date) => value <= new Date(),
      message: 'Date of Birth cannot be in the future'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password by default in queries
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  // toJSON: {
  //   transform: function(doc, ret) {
  //     delete (ret as any).password; // Remove password from JSON output
  //     return ret;
  //   }
  // }
});

// Create and export the model
export const User = mongoose.model<IUser>('User', userSchema);
