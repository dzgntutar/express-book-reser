import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/const.js';

const checkToken = (req, res, next) => {
    console.log('checkToken :::');

    try {
        let token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, JWT_SECRET_KEY, async (error) => {
                if (error) {
                    res.redirect('/login');
                }
                next();
            });
        } else res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.status(401).json({
            succeeded: false,
            error: 'Not authorized',
        });
    }
};

const getGeneralInfo = (req, res, next) => {
    console.log('getGeneralInfo :::');
    let token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.userName = null;
                next();
            } else {
                res.locals.userName = decodedToken.userName;
                next();
            }
        });
    } else {
        res.locals.userName = null;
        next();
    }
};

export { checkToken, getGeneralInfo };
