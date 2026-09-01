import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  filmId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  seat: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
