import mongoose, {Document, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import { create } from 'domain';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  chips: number;
  statistics: {
    gamesPlayed: number;
    gamesWon: number;
    totalEarnings: number;
    handsPlayed: number;
  };
  createdAt: Date;
  lastLogin: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema : Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },
  chips: {
    type: Number,
    default: 1000
  },
  statistics: {
    gamePlayed: {
      type: Number,
      default: 0
    },
    gamesWon: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    handsPlayed: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password as string);
};

export default mongoose.model<IUser>('User', UserSchema);