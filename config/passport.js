const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

// 載入 User model
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

module.exports = passport => {
    // local strategy
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ where: { email: email } })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' })
                }
            
                // 用 bcrypt 來比較「使用者輸入的密碼」跟在使用者資料庫的密碼是否是同一組字串
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Email and Password incorrect' })
                    }
                })
            })    
            .catch(err => {console.error(err)}) 
        })
    )

    // facebook strategy
    passport.use( new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
            User.findOne({ where: { email: profile._json.email } })
                .then(user => {
                    if (!user) {
                        let randomPassword = Math.random().toString(36).slice(-8)
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(randomPassword, salt, (err, hash) => {
                                let newUser = new User({
                                    name: profile._json.name,
                                    email: profile._json.email,
                                    password: hash
                                })
                                newUser.save()
                                .then(user => {
                                    return done(null, user)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                            })
                        )
                    } else {
                        return done(null, user)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            user = user.get()
            done(null, user)
        })
    })
}