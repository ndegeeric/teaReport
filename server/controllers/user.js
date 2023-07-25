import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import User from "../models/user.js";

dotenv.config();

const secret = process.env.SECRET;

export const signup = async(req, res) => {
    const { email, firstname, lastname, password, cpassword } = req.body;

    try {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)) return res.status(403).json({ message: `You must enter a valid email address.`});

        const isExistingUser = await User.findOne({ email });

        if(isExistingUser) return res.status(403).json({ message: `User with this email is already registered`});

        const reg = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/

        if (!reg.test('P@ssw0rd')) return res.status(403).json({ message: 'Password must contain uppercase and special characters'})

        if ( password !== cpassword )  return res.status(403).json({ message: `passwords don't match` });
        
        const hashedPassword = await bcrypt.hash(password, 12);
                
        // const newUser = await User.create({ email, name: `${ firstname } ${ lastname }`, password: hashedPassword });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, { expiresIn: '1h'})
        
        res.status(404).json({message: `Temporally disabled`});
    } catch (error) {
        res.status(500).json({ message: `Server error, contact the administrator`});
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body;

    try {

        const isExistingUser = await User.findOne({ email });

        if(!isExistingUser) return res.status(404).json({ message: `Kindly signup to access this service`});

        const isPasswordCorrect =  await bcrypt.compare( password, isExistingUser.password );

        if(!isPasswordCorrect) return res.status(403).json({ message: `User not authenticated. User password is incorrect`});

        const token = jwt.sign({ email: isExistingUser.email, id: isExistingUser._id}, secret, { expiresIn: '1h' });

        const user =  { name: isExistingUser.name, email: isExistingUser.email };

        res.status(200).json({user, token});
        
    } catch (error) {
        res.status(500);
    }
    // res.send(' You are now logged in')
}