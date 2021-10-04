import express, {Request, Response} from 'express';
import routes from './routes/index';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import { DB_CONN } from './config/constants';

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(DB_CONN);

app.use(passport.initialize());

app.use(routes);

app.use((req: Request, res: Response) => {
    res.status(404).json({message: 'Not Found!'})
});

app.listen(3500, () => console.log('server listening!'));