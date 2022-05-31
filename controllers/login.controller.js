const AccountModel = require('../models/Account.model');
const MembreModel = require('../models/membre.model');
const bcrypt = require('bcrypt');

module.exports = {
    connectUser: async (req, res) => {
        try {
            const {email , password} = req.body;
            const user = await AccountModel.findOne({email});
            if(!user){
                console.log("user not found");
                return res.redirect('/register');
                //return res.send("email doesnt exists")
            }
            if(await bcrypt.compare(password,user.password)){
                if(user.verified){
                    console.log("user connected");
                    req.session.isAuth = true;
                    req.session.email=email;
                    if(await MembreModel.findOne({email}) || user.role === "DrivingSchool" ){
                        return res.redirect('/connected'); // or profile ...
                    }
                    console.log('complete ur informations');
                    res.redirect('/membre');
                }else{
                    console.log('check your verification email');
                    return res.redirect('/login');
                }
            }else{
                console.log('wrong password')
                return res.redirect('/login')
            }

        } catch (error) {
            res.status(400).json(error);
            console.log("de SVz");
        }
    }
}
