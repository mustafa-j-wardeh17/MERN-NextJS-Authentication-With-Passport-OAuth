import passport from "passport";
import User from "../Models/userModel.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv'
dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            console.log("Profile received", profile);

            const findUser = await User.findOne({ googleId: profile.id });
            if (findUser) {
                return done(null, {
                    id: findUser._id,
                });
            }
            // If user is not found in the database then create a new one
            const createUser = User({
                role: "google",
                googleId: profile.id,
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