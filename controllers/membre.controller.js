const AccountModel = require('../models/Account.model');
const MembreModel = require('../models/membre.model');

module.exports = {
    AddMembre: async (req, res) => {
        try {
            const {firstname,lastname,birthday,phone,adress} = await req.body;
            const mail = req.session.email;
            const user = await AccountModel.findOne({email:mail});
            if(!user){
                return res.status(400).json({"message":"user not found"})
            }
            const {pseudo,email,password} = user;
            console.log({firstname,email,password});
            const dataInstance = new MembreModel({email,firstname,lastname,birthday,phone,adress});
            //console.log('\n\n req before hash ====>',dataInstance)
            //const hashedPassword = await bcrypt.hash(dataInstance.password,10)
            //dataInstance.password = hashedPassword;
            console.log('\n\n datainstance ====>',dataInstance)
            await dataInstance.save()
            //res.status(201).json(instance);
            return res.redirect('/connected')
        } catch (error) {
            res.status(400).json(error);
            console.log("addmemebre catch err");
        }
    }
}
