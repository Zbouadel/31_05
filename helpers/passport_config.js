const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const localStrategy = require('passport-local').Strategy;

const initialize = (passport)=>{
    const authenticateUser = async (email,password,done)=>{
        const user = getUserByEmail(email)
        
        if(user == null){
            return done(null,false,{message: 'NO User With This Email' });
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null,false,{message : 'Password Incorrect'})
            }
        }catch (e){
            return done(e); 
        }
    }
    passport.use(new localStrategy({usernameField : 'email'},authenticateUser()));
    passport.serializeUser((user,done)=> { })
    passport.deserializeUser((user,done)=> { })
}

module.exports = initialize;