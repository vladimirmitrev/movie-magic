const router = require('express').Router();
const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;

    // try {
        await castService.create(castData);
        res.redirect('/');
    // } catch(err) {
    //     console.log(err);
    //     res.redirect('/create');
    // }

    // console.log(body);
});

module.exports = router;