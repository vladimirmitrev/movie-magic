const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware'); 

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    // const user = await req.user;
    const newMovie = {
        ...req.body,
        owner: req.user._id,
    };
    // newMovie.owner = await req.user._id;
    
    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch(err) {
        console.log(err.message);
        res.redirect('/create');
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    // Add isOwner check
    const isOwner = movie.owner == req.user?._id;
    const isAuthenticated = !!req.user;

    movie.rating = new Array(Number(movie.rating)).fill(true);
    // movie.ratingStars = '&#x2605;'.repeat(movie.rating);

    // console.log(casts);
    res.render('movie/details', { movie, isOwner, isAuthenticated }); //casts

});

router.get('/movies/:movieId/attach', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();

    //TODO: remove already added casts
    res.render('movie/attach', {...movie, casts});
});

router.post('/movies/:movieId/attach', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    
    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/attach`);
});

router.get('/movies/:movieId/edit', isAuth, async (req, res) => {

    const movie = await movieService.getOne(req.params.movieId).lean();

    res.render('movie/edit', { movie });
});

router.post('/movies/:movieId/edit', isAuth, async (req, res) => {
    const editedMovie = req.body;

    await movieService.edit(req.params.movieId, editedMovie);

    res.redirect(`/movies/${req.params.movieId}`);
});

router.get('/movies/:movieId/delete', isAuth, async (req, res) => {
   await movieService.delete(req.params.movieId);

   res.redirect('/');
});
module.exports = router;