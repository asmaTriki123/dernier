const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateurs');
const { Token } = require('../models/Token');
const { type } = require('express/lib/response');
const {auth} = require('../middlewares/auth');
/*const { resetPassword }  = require('../utils/emailTemplates')
const { sendEmail } = require('../utils/sendEmail');*/
//const { Router } = require('express');
const Station = require('../models/station');
const res = require('express/lib/response');
routes.post("/register", async (req, res) => {
    const {
      cin,
        nom,
      prenom,
      role,
      Adr,
      Num_tel,
      MPass
    } = req.body;
  
    const {
        email,
        Nom_station,
        type_lavage,
        latitude,
        longitude,
        password,
        Role
      } = req.body;
    
    try {
        if(role == "client" ){
      const newUser = new Utilisateur({
        cin,
        nom,
      prenom,
      role,
      Adr,
      Num_tel,
      MPass
      });
  
      const searchUser = await Utilisateur.findOne({
        Adr
      });
      if (searchUser) {
        return res.status(500).send({
          msg: "compte déja existe"
        });
      }
  
  
  
      const salt = 10;
      const gensalt = await bcrypt.genSalt(salt);
      const hashedPassword = await bcrypt.hash(MPass, gensalt);
      newUser.MPass = hashedPassword;
  
  
      let result = await newUser.save();
  
      res.status(200).send({
        user: result,
        msg: "enregistrer avec succes"
      });}
      else if( Role == "lavage"){


        const newStation = new Station({
            email,
        Nom_station,
        type_lavage,
        latitude,
        longitude,
        password,
        Role
          });
      
          const searchStation = await Station.findOne({
            email
          });
          if (searchStation) {
            return res.status(500).send({
              msg: "compte déja existe"
          });
          }
      
      
      
          const salt = 10;
          const gensalt = await bcrypt.genSalt(salt);
          const hashedPassword = await bcrypt.hash(password, gensalt);
          newStation.password = hashedPassword;
      
      
          let result = await newStation.save();
      
          res.status(200).send({
            station: result,
            msg: "enregistrer avec succes"
          });









      }
    } catch (error) {
      console.log(error)
      res.status(400).send("vous pouvez pas enregistrer utilisteur");
    }
  })






//get satation avec status false
routes.get('/getbyrole', async (req,res)=>{
 try {
    const st = await Station.find({
        statut: false

    }) 
    res.status(200).send(st)
 } catch (error) {
     console.log(error);
     res.status(401).send(error)
 }
})
    
    
//get all station


routes.get('/getAll', async (req,res)=>{
    try {
       const st = await Station.find({
        
   
       }) 
       res.status(200).send(st)
    } catch (error) {
        console.log(error);
        res.status(401).send(error)
    }
   })


// update station
routes.put('/mdf/:id', async (req, res) =>{
    try {
       const id = req.params.id
       let mdd = {
           statut:true
       }
       let aa = await Station.findByIdAndUpdate({_id:id},{...mdd}
        
        )
        res.status(200).send(mdd)
    } catch (error) {
      console.log(error);  
      res.status(401).send(error)
    }
})


// delete station
/*routes.delete('/dl/:id', async (req,res)=>{
try {
    const id = req.params.id
    let aa = await Station.deleteOne({_id:id})
    res.status(200).send("supprimer avec succes")
} catch (error) {
    console.log(error);  
      res.status(401).send(error)
}

})*/



routes.delete('/dl/:id', async (req,res)=>{
    try {
       
        
         await Station.deleteOne({_id:req.params.id})
        res.status(201).json({message: "supprimer avec succes"});
    } catch (error) {
        console.log(error.message);  
       
    }
    
    })

    

routes.post("/login", (req, res) => {
    Utilisateur.findOne({Adr: req.body.Adr}).exec().then((utilisateur) => {
if(!utilisateur){
    return res.status(401).json({
        message: "Utilisateur n'est pas trouve",
        status: false,
        data: undefined
    })
}
bcrypt.compare(req.body.MPass, utilisateur.MPass, async(err, result) => {
    if(err){
        return res.status(401).json({
            status: false,
            message: "Server error, authentification failed",
            data: undefined
        })
    }

    if(result){
        const token = jwt.sign(
            {

                Adr: utilisateur.Adr,
                utilisateurId: utilisateur._id          
              },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                
            }

        );
  


        await Token.findOneAndUpdate({_utilisateurId: utilisateur._id, tokenType: "login"},{token: token},  {new: true, upsert: true})
       return res.status(200).json({
      status: true, 
      message: "login successfuly",
      data: {
          token,
          utilisateur
      }

       })
    }
 
    return res.status(401).json({
        status: true,
        message: "worng password, login failed",   
         data: undefined
 })
})
    })
.catch((err)=>{
    res.status(500).json({
        status: false,  
        message: "server error, authentification failed ",
        data: undefined 
    })
})
});

routes.get("/logout",auth, (req, res) => {
    Token.findOneAndDelete({_utilisateurId: req.utilisateurId, type: "login"}, (err, doc) => {
        if(err) return res.status(401).json({
          status: false,
          message: "server error, logout failed",
        })
        return res.status(200).json({
            status: true,
            message: 'logout successfly'
        })
    
    })
})

routes.get("/authUser", auth, (req,res) => {
    const utilisateurId =req.utilisateurId
    Utilisateur.findById(utilisateurId, (err, utilisateur) =>{
        if(err){
            return res.status(401).json({
                status: false,
                message: "Authentification failed",
                data: undefined
            })
        }
        if(utilisateur){
            res.status(200).json({
                data: utilisateur,
                message: "Authentification successfully!",
                status: true,
            })
        }

    })
})




// modifier un utilisateur

routes.put("/m/:id", async (req, res) => {
    
    try {
     
        const data = await Utilisateur.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        )
        res.status(201).json(data);
      }
     catch (error) {
      console.log(error.message);
    }})

 
// supprimer un utilisateur


routes.delete('/supprimerutl/:id', async (req,res)=>{
    try {
      
        await Utilisateur.deleteOne({_id:req.params.id})
        res.status(200).json({message:"utilisateur supprimer avec succes "});
    } catch (error) {
        console.log(error.message);  
         
    }
    
    })

// get all utilisateur

routes.get('/getutilisateurs', async (req,res)=>{
    try {
        role="client"
       const list = await Utilisateur.find({role
        
   
       }) 
       res.status(200).send(list)
    } catch (error) {
        console.log(error);
        res.status(401).send(error)
    }
   })






// ajouter un admin


routes.post('/ajoutadmin', async(req, res)=>{
    try {
      
const admin = new Utilisateur({
role: "admin",
MPass: req.body.MPass,
nom: req.body.nom,
prenom: req.body.prenom,
email: req.body.email,
Adr: req.body.Adr,
Num_tel :req.body.Num_tel

});
 await admin.save();
 

res.status(201).json({message: " admin  ajouter avec succes"}) 
    } catch (error) {
       console.log(error.message); 
    }
})
   
   







module.exports = routes;