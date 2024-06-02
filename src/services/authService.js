const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config')

exports.register = async (userData) => {
    const existingUser  = await User.findOne({email: userData.email});

    if (existingUser ) {
        throw new Error('Email already exist!')
    }
    // const user = new User(userData);
    // await user.save();
   return User.create(userData);
} 

exports.login = async (email, password) => {
    // Get user from DB
    const user = await User.findOne({ email });

    // Check if user exist
    if (!user) {
        throw new Error('Wrong email or password!')
    }

    // Check if password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Wrong email or password!')
    }
    // Generate jwt token
    const payload = {
        _id: user.id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });

    // return token
    return token;
};