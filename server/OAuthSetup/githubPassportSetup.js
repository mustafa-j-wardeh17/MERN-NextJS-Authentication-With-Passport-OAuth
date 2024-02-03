import passport from "passport";
import User from '../Models/userModel.js'
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from 'dotenv'
dotenv.config()

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const findUser = await User.findOne({ githubId: profile.id });
            if (findUser) {
                return done(null, {
                    id: findUser._id,
                });
            }
            // If user is not found in the database then create a new one
            const createUser = User({
                role: "github",
                githubId: profile.id,
            })
            await createUser.save();
            done(null, {
                id: createUser._id
            })
        } catch (err) {
            console.error(`Error in Google OAuth: ${err}`);
            return done(err);
        }
    }
));