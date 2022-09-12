import express from 'express';
import User from '../models/userModel.js';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/const.js';
import { BaseResponse } from '../models/dtos/response.js';

const authRouter = express.Router();

authRouter.get('/login', (req, res) => {
    let bResponse = BaseResponse.Success('Success');
    res.status(200).render('login', { bResponse });
});

authRouter.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            if (user.password === password) {
                let userId = user._id;
                let userName = user.username;
                let token = Jwt.sign({ userId, userName }, JWT_SECRET_KEY, {
                    expiresIn: '1d',
                });

                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                });

                res.redirect('/index');
            } else {
                const bResponse = BaseResponse.Error(
                    'Paswords are not matched'
                );
                console.log(bResponse);
                res.redirect('login', {
                    bResponse,
                });
            }
        } else {
            const bResponse = BaseResponse.Error('User not found');
            console.log(bResponse);

            res.redirect('login', { bResponse });
        }
    } catch (error) {
        console.log(error);
        const bResponse = BaseResponse.Error(error);
        res.redirect('login', { bResponse });
    }
});

authRouter.get('/logout', (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1,
    });
    res.redirect('/index');
});

authRouter.get('/signin', async (req, res) => {
    res.render('signin');
});

authRouter.post('/signin', async (req, res) => {
    try {
        User.create(req.body);

        res.redirect('/user/login');
    } catch (error) {
        res.status(404).render('error');
    }
});

export { authRouter };
