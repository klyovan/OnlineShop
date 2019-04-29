/**
 * express module
 * @var
 */
var express = require('express');


/**
 * Express router to mount user related functions on.
 * @type {object}
 * @var
 * @namespace usersRouter
 */
var router = express.Router();


var isLoggedIn = require('../config/auth').ensureAuthenticated;


//Controllers
var googleAuth = require('../controllers/Google-authentication');
 var signUp = require('../controllers/signup');
 var signIn = require('../controllers/signin');
 var mailConfirm = require('../controllers/mailConfirm');





/**
 * route which is responsible for serving user profile data from google account.
 * @name get/google~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/google', googleAuth.getProfile);

/**
 * route which is responsible for serving login form.
 * @name get/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/auth/google/redirect', googleAuth.redirectG, googleAuth.redirectProfile);


/**
 * route which is responsible for serving login form.
 * @name get/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/signup', signUp.getSignup);


/**
 * route which is responsible for serving login form.
 * @name get/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signup',signUp.postSignup);


/**
 * route which is responsible for serving login form.
 * @name get/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/profile',isLoggedIn,signIn.profile);


/**
 * route which is responsible for serving login form.
 * @name get/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/signin',signIn.getSignIn);

/**
 * route which is responsible for receiving data from  login form.
 * @name post/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signin',signIn.postSignIn);


/**
 * route which is responsible  for activate users account using mail activation strategy.
 * @name post/verify~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/verify',mailConfirm.verify);


/**
 * route which is responsible for logout user.
 * @name get/logout~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/logout',isLoggedIn,signIn.logout);

/**
 * route which is responsible for serving user orders history .
 * @name get/orders~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/orders',isLoggedIn,signIn.orders);


/**
 * route which is responsible for serving form for  password  reset.
 * @name get/forgot~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/forgot',signIn.getForgot);

/**
 * route which is responsible for generate token and send it on users mail.
 * @name post/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/forgot',signIn.postForgot);

/**
 * route which is responsible for receiving token from mail.
 * @name post/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/reset/:token',signIn.getReset);

/**
 * route which is responsible for changing  password  to a new one.
 * @name post/signIn~usersRouter
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/reset/:token',signIn.postReset);



module.exports = router;

