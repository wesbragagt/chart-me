import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChartDocument = Chart & Document;

@Schema()
export class Chart {
  @Prop()
  user_id: string;
  @Prop()
  title: string;

  @Prop()
  key: string;

  @Prop()
  bpm: number;

  @Prop()
  sections: {
      id: string;
      label: string;
      value: string;
  }[]
}

export const ChartSchema = SchemaFactory.createForClass(Chart);