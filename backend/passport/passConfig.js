import { Strategy} from "passport-local";

const passConfig = (passport, loadUserBy) => {

    const verify = async (username, password, done) => {

        const user = await loadUserBy(username)

        if(!user){
            return done(null, false)
        }
        
        if(password === user.password){
            return done(null, user)
        }
        else{
            return done(null, false)
        }

    }

    passport.use(new Strategy({usernameField: 'username'}, verify))

    passport.serializeUser((user, done) => done(null, user.username))

    passport.deserializeUser( async(username, done) => {
        done(null, await loadUserBy(username))
    })

}

export default passConfig;