const { db }  = require("../db/server.js") 

const getAllActiveCS = (req,res,next) =>{
 db.any('SELECT * FROM users WHERE COMPLETED = false ORDER BY last_active_date DESC').then((result) => {
  res.status(200).json(
   {
    status:200,
    users:result
   }
  )
 }).catch((err) => {
  status:400;
  message:err.message
 });
}

const getOneCSInfo = (req,res,next) =>{
 db.one(`SELECT * FROM users where id = ${req.query.id}`).then((result)=>{
  res.status(200).json(
   {
    status: 200,
    result
   }
  )
}).catch((err) => {
 console.log(err)
});

}

const addNewCS = (req,res,next) =>{
   let body = [
   req.body.first_name, req.body.middle_name,req.body.last_name,req.body.start_date,req.body.mandate_hours
 ]
 db.none(`INSERT INTO users (first_name, middle_name, last_name, start_date, mandate_hours ) VALUES ($1,$2,$3,$4,$5)`,body)
 .then((result)=>{
   db.any('SELECT * FROM users WHERE first_name = $1 AND middle_name = $2 AND last_name = $3 AND mandate_hours = $5',body).then((result)=>{
  res.status(200).json(
   {
    id: result[0].id,
    status: 200,
    data: result
   }
  )
   })
 }).catch((err) => {
  res.status(494).json(
    {
      message: err
    }
  )
});

}


  module.exports = {
   getAllActiveCS,
   getOneCSInfo,
   addNewCS
  }