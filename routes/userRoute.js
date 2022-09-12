import express from 'express';
import User from '../models/userModel.js';
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

userRouter.post('/:id', checkToken, async (req, res) => {
    try {
        console.log('aaaaaaaaaaaaaaaaaaaa');
        let id = req.params.id;

        const user = await User.findById({ _id: id });

        const bResponse = BaseResponse.Success('Success', user);

        res.status(200).render('user', { bResponse });
    } catch (error) {
        const bResponse = BaseResponse.Success('User not found');
        res.status(404).render('user', { bResponse });
    }
});

export { userRouter };
