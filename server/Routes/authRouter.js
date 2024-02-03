import express from 'express'
import { DeleteUserController, LoginController, OAuthLogin, RegisterController, VerifyOAuth, logoutController } from '../Controller/authController.js'
import { verifyToken, verifyUserToken } from '../Middlewares/verifyToken.js'
import passport from 'passport'

const authRouter = express.Router()

//---------------------------------
//--------------Email--------------
//---------------------------------

authRouter.post('/email/register', RegisterController)
authRouter.post('/email/login', LoginController)



//---------------------------------
//-----------GoogleOAuth-----------
//---------------------------------
authRouter.get('/google/login', passport.authenticate("google", {
    scope: ['profile', 'email']
}))

authRouter.get("/google/login/callback", passport.authenticate("google", {
    failureRedirect: "/google/login",
    session: false,
})
    , OAuthLogin
);

//---------------------------------
//-----------GithubOAuth-----------
//---------------------------------
authRouter.get('/github/login', passport.authenticate("github", {
    scope: ['profile']
}))

authRouter.get("/github/login/callback", passport.authenticate("github", {
    failureRedirect: "/github/login",
    session: false,
})
    , OAuthLogin
);
//---------------------------------
//-----------Common OAuth----------
//---------------------------------
authRouter.get('/verifyoauth', VerifyOAuth)



//---------------------------------
//------Common (Email+OAuth)-------
//---------------------------------
authRouter.delete('/users/:id', verifyUserToken, DeleteUserController)
authRouter.get('/logout', verifyToken, logoutController)

export default authRouter