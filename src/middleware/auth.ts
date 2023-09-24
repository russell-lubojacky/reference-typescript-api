import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import dotenv from 'dotenv';
import { doesNotThrow } from 'assert';

dotenv.config();

const clientId: string = process.env.CLIENT_ID || '';
const clientSecretId: string = process.env.CLIENT_SECRET_ID || '';
const authorizationUrl: string = process.env.AUTHORIZATION_URL || '';
const tokenUrl: string = process.env.TOKEN_URL || '';
const callbackUrl: string = process.env.CALLBACK_URL || '';

if (!clientId || !clientSecretId || !authorizationUrl || !tokenUrl || !callbackUrl) {
    console.log('Please create .env file, refer .env.sample');
    process.exit(0);
}

passport.use('keycloak', new OAuth2Strategy({
    authorizationURL: authorizationUrl,
    tokenURL: tokenUrl,
    clientID: clientId,
    clientSecret: clientSecretId,
    callbackURL: callbackUrl
},
(accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user!);
});