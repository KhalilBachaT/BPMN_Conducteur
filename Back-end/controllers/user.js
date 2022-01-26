const bcrypt = require("bcryptjs");
const db = require("../db/db");
const jwt = require("jsonwebtoken");

'use strict';

const {Engine} = require('bpmn-engine');
const {EventEmitter} = require('events');


const register = (req, res) => {

  const user = req.body;  
  let sql = "Select * from utilisateur where email = ?";
  db.query(sql, [user.email], (err, results) => {
    if (err) res.status(403).json({ error: err.errno });
    else {
      if (results.length === 0) {
        
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        sql = "Insert into utilisateur values (DEFAULT,?,?,?,?)";
        db.query(
          sql,
          [user.email, user.nom, user.prenom, hashedPassword],
          (err, results) => {
            if (err) res.status(403).json({ error: err.errno });
            else
            {
              res.status(200).json({ message: "Utilisateur ajouté avec succès" });
              console.log(user.email)
            }
          }
        );
      } else {
        res.status(200).json({ message: "Utilisateur existe déja" });
      }
    }
  });

};

const login = (req, res) => {
  console.log("iam in controller login")
  const user = req.body;
  let sql = "Select * from utilisateur where email = ?";
  db.query(sql, [user.email], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else {
      if (results.length === 0)
        res.status(200).json({ message: "Utilisateur n'existe pas" });
      else {
        if (!bcrypt.compareSync(user.password, results[0].password))
          res.status(200).json({ message: "Email ou mot de passe incorrect" });
        else {
          const token = jwt.sign(user.email, "JG54UGFRS");
          res.status(200).json({
            ...results[0],
            password: undefined,
            token,
          });
        }
      }
    }
  });
};

const execDiagram =(req,res)=> {
  console.log(req.body)
  const engine = Engine({
    name: 'exclusive gateway example',
    source:req.body.xml
  });
  
  const listener = new EventEmitter();
  
  listener.on('activity.start', (api) => {
    if (api.id === 'end1') throw new Error(`<${api.id}> was not supposed to be taken, check your input`);
    if (api.id === 'end2') console.log(`<${api.id}> correct decision was taken`);
  });
  
  engine.execute({
    listener,
    variables: {
      input: 51
    }
  });
  
  engine.on('end', (req,res) => {
    console.log('completed');
  });
}

module.exports = { register, login, execDiagram };
