import mongoose, { mongo } from 'mongoose'
import { Sede } from '../interfaces/sede.interface';

const SedeSchema = new mongoose.Schema<Sede>({
    name: { type: String }
})

export const SedeModel: any = mongoose.model<Sede>('Sede', SedeSchema);