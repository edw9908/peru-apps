import { PassportLocalDocument } from 'mongoose';

export interface User extends PassportLocalDocument {
    name: string,
    last_name: string,
    mobile_phone: string,
    sede: string,
    birth_date: Date,
    isAdmin: boolean,
    additionals: any
}