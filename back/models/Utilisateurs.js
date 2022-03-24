const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilisateurSchema = Schema({

    cin: {
        type: Number,
        maxLength: 50
    },
    nom: {
        type: String,
        maxLength: 50
    },
    prenom: {
        type:String,
        maxLength:50
    },
    Num_tel: {
        type:Number,
    
    },
    Adr: {
        type:String,
      
        trim: true
    },
    MPass:{
        type:String,
        minLength:6
    },
    role: {
        type: String,
enum:["client","admin"]
    }
});

module.exports=  mongoose.model("utilisateur", utilisateurSchema);





