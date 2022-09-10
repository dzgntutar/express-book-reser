import express from 'express';
import User from '../models/userModel.js';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/const.js';
import { checkToken } from '../middlewares/authMiddleware.js';
import { BaseResponse } from '../models/dtos/response.js';

const userRouter = express.Router();

userRouter.get('/', checkToken, async (req, res) => {
    try {
        let users = await User.find({});

        const bResponse = BaseResponse.Success('Proccess is success', users);
        res.status(200).render('users', { bResponse });
    } catch (error) {
        const bResponse = BaseResponse.Error('Error');
        res.status(500).render('users', { bResponse });
    }
});

userRouter.get('/login', (req, res) => {
    let bResponse = BaseResponse.Success('Success');
    res.status(200).render('login', { bResponse });
});

userRouter.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            if (user.password == password) {
                let userId = user._id;
                let userName = user.username;
                let token = Jwt.sign({ userId, userName }, JWT_SECRET_KEY, {
                    expiresIn: '1d',
                });

                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                });

                res.redirect('/');
            } else {
                const bResponse = BaseResponse.Error(
                    'Paswords are not matched'
                );
                res.status(401).render('login', {
                    bResponse,
                });
            }
        } else {
            const bResponse = BaseResponse.Error('User not found');
            res.status(401).render('login', { bResponse });
        }
    } catch (error) {
        const bResponse = BaseResponse.Error(error);
        res.status(500).send('login', { bResponse });
    }
});

userRouter.get('/logout', (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1,
    });
    res.redirect('/');
});

userRouter.get('/signin', async (req, res) => {
    res.render('signin');
});

userRouter.post('/signin', async (req, res) => {
    try {
        User.create(req.body);

        res.redirect('/user/login');
    } catch (error) {
        res.status(404).render('error');
    }
});

export { userRouter };
