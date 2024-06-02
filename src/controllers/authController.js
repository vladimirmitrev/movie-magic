const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);
        res.redirect('/auth/login');
    } catch (err) {
       const message = getErrorMessage(err);

        // console.log(err.message)
        res.render('auth/register', { ...userData, error: message });
    }

});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const token = await authService.login(email, password);
        
        res.cookie('auth', token);
        
        res.redirect('/');

    } catch (err){ 
        const message = getErrorMessage(err);

        res.status(400).render('auth/login', { error: message, ...req.body })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

module.exports = router;