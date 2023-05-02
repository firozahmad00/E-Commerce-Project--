const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const authRouter = require('./routers/auth.router');
const productRouter = require('./routers/product.router');
const orderRouter = require('./routers/order.router');
const middlewares = require('./middlewares');
const reviewRouter = require('./routers/review.router');

var cors = require('cors')

app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.json({limit: '1mb'}));
mongoose.connect(`${config.MONGODB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`db is up on runing`);
    }
});
const {userSchema, userModel} = require('./models/user.model');
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: '649746538205-dhvkgkr12lvd8vsc9mkooo9sjddhhtl3.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        const user = await userModel.find({username: profile.id});
        cb(null, profile)
    } catch(err) {
        // console.log(err);
    }
  }
));


app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  async function(req, res) {
    console.log(res, '----------');
    // Successful authentication, redirect secrets.
    // const token = await jwt.sign({
    //     userId: user._id,
    //     mobile: user.mobile,
    //     email: user.email
    // }, constants.Secret, { expiresIn: 60 * 60 });
    res.redirect(`http://localhost:3000/?accessToken=${'78'}`);
  }
);

app.get("/logout", function(req, res){
    res.redirect("http://localhost:3000/");
});
// app.use(middlewares.authorization);
app.use('/v1/users', authRouter);
app.use('/v1/products', productRouter);
app.use('/v1/orders', orderRouter);
app.use('/v1/reviews/', reviewRouter);

app.get('/healthcheck', (req, res) => {
    res.send({status: 'ec-services is up on running'});
});


app.listen(config.portNo, () => {
    console.log(`Server is runing on:${config.portNo}`);
});




