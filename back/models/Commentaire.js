const mongoose = require( 'mongoose');
const  autoIncrement =('mongoose-auto-increment');


const avischema = mongoose.Schema({
   
    avis :{ type:String },
  
});



 module.exports = mongoose.model('Commentaire', avischema);
