import mongoose, {Document, Schema } from 'mongoose';

export interface Card{
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number;
}

export interface PlayerInHand{
  playerId: mongoose.Types.ObjectId;
  cards: Card[];
  chips: number;
  betAmount: number;
  folded: boolean;
  position: number;
}

export interface Action{
  type: 'fold' | 'check' | 'call' | 'raise' | 'all-in';
  playerId: mongoose.Types.ObjectId;
  amount: number;
  timestamp: Date
}

export interface IHand extends Document {
  tableId: mongoose.Types.ObjectId;
  deck: Card[];
  communityCards: Card[];
  pot: number;
  currentBet: number;
  dealer: mongoose.Types.ObjectId;
  smallBlind: mongoose.Types.ObjectId;
  bigBLind: mongoose.Types.ObjectId;
  currentPlayer: mongoose.Types.ObjectId;
  players: PlayerInHand[];
  actions: Action[];
  status: 'preflop' | 'flop' | 'turn' | 'river' | 'showdown' | 'completed';
  winner?: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
}

const CardSchema = new Schema({
  suit: {
    type: String,
    enum: ['hearts', 'diamonds', 'clubs', 'spades'],
    required: true
  },
  value: {
    type: Number,
    min: 2,
    max: 14,
    required: true
  }
});

const ActionSchema = new Schema({
  type: {
    type: String,
    enum: ['fold', 'check', 'call', 'raise', 'all-in'],
    required: true
  },
  playerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const PlayerInHandSchema = new Schema({
  playerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cards: [CardSchema],
  chips: {
    type: Number,
    required: true
  },
  betAmount: {
    type: Number,
    default: 0
  },
  folded: {
    type: Boolean,
    default: false
  },
  position: {
    type: Number,
    required: true
  }
});


const HandSchema : Schema = new Schema({
  tableId: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  deck: [CardSchema],
  communityCards: [CardSchema],
  pot: {
    type: Number,
    default: 0
  },
  currentBet: {
    type: Number,
    default: 0
  },
  dealer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  smallBlind: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bigBLind: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentPlayer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: [PlayerInHandSchema],
  actions: [ActionSchema],
  status: {
    type: String,
    enum: ['preflop', 'flop', 'turn', 'river', 'showdown', 'completed'],
    default: 'preflop'
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  } 
})


export default mongoose.model<IHand>('Hand', HandSchema);