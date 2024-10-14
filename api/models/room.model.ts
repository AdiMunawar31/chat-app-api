import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true, unique: true },
});

export const Room = mongoose.model<IRoom>('Room', RoomSchema);
