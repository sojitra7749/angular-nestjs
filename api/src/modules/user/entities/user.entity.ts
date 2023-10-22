import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, required: false })
  updatedAt: Date;

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method(
  'comparePassword',
  async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
  },
);
