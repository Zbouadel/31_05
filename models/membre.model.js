const mongoose = require('mongoose');
const schema = mongoose.Schema;


const MembreSchema = new schema({
    email:{
        type: String,
        required:true
    },
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:true
    },
    birthday:{
        type:Date,required:true
    },
    phone:{
        type: String,
        required: true
    },
    adress:{
        type:String,
        required:true
    }
},{timestamps:true}
);


// MembreSchema.post("save",()=>{
//     const modulee_id = String(this.module)
//     if (modulee_id) {
//       moduleModel.findOneAndUpdate({ _id: modulee_id }, { $push: { modeleEvaluations: this._id } }, (err, doc) => {
//             if(err)
//                 console.log(err)
//             })
//     } 
//   });


//   modulee.post("save", function () {
//     const formation = String(this.formation)
//     if (formation) {
//         formationSchema.findOneAndUpdate({ _id: formation }, { $push: { modules: this._id } }, (err, doc) => {
//             if(err)
//                 console.log(err)
//             })  
//     } 
// });





module.exports =  mongoose.model('Membre',MembreSchema);
