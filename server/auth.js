var passport = require('koa-passport')

var user = { id: 1, username: 'test' }

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, user)
})


var FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
    clientID: '1430508653909057',
    clientSecret: '55ddd1f9c5f3fa10851064797dacd8a0',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    console.log("token", token);
    console.log("tokenSecret", tokenSecret);
    console.log("profile", profile);

    done(null, user)
  }
));

var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  // 這邊需要改寫成直接使用  orm 處理
  if (username === 'test' && password === 'test') {
    done(null, user)
  } else {
    done(null, false)
  }
}));
