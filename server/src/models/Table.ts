import mongoose, {Document, Schema} from 'mongoose';

export interface ITable extends Document {
  name: string;
  maxPLayers: number;
  minBet: number;
  bigBlind: number;
  smallBlind: number;
  players: mongoose.Types.ObjectId[];
  gameState: 'waiting' | 'playing' | 'ended';
  currentHand?: mongoose.Types.ObjectId;
  createdAt: Date;
  password?: string;
}

const TableSchema : Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  maxPlayers: {
    type: Number,
    default: 6
  },
  minBet: {
    type: Number,
    requred: true
  },
  bigBlind: {
    type: Number,
    required: true
  },
  smallBlind: {
    type: Number,
    required: true
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  gameState: {
    type: String,
    enum: ['waiting', 'playing', 'ended'],
    default: 'waiting'
  },
  currentHand: {
    type: Schema.Types.ObjectId,
    ref: 'Hand'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String
  }
});

export default mongoose.model<ITable>('Table', TableSchema);