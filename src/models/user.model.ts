import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema = new mongoose.Schema<User>({
    name: {type: String, required: true},
    last_name: {type: String, required: true},
    mobile_phone: {type: String, required: true},
    sede: {type: String, required: true},
    birth_date: {type: Date, required: true},
    isAdmin: {type: Boolean, default: false, immutable: true},
    additionals: {type: 'Mixed'}
})

UserSchema.plugin(passportLocalMongoose);

export const UserModel: any = mongoose.model<User>('User', UserSchema);