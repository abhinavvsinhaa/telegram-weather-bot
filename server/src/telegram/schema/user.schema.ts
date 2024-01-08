import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaType } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    chatId: string
}

export const UserSchema = SchemaFactory.createForClass(User)