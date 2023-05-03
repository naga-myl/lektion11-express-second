//import database driver
const dbDriver=require('better-sqlite3');
//connect to db
const db=dbDriver('bands.sqlite3');

//import express
const express=require('express');

//create express app
const app=express();

//configure express
app.use(express.static('frontend'));//server frontend
app.use(express.json());//use json

//building the rest api
//get all
app.get('/bands',(req,res)=>
{
    const bands = db.prepare('select * from bands').all();
    //return bands in json
    res.json(bands);

});

//get one
app.get('/bands/:id',(req,res)=>
{
    //get single bannd from url parameter
    
    const band =db.prepare('select *from  bands where  id=?').get(req.params.id);
     //return json or error
    res.json(band || {error:'No such band'});
});
//create new band -post
app.post('/bands',(req,res)=>
{
//log out to the console
console.log(req.body);
//get the name  and genre from request body
const name =req.body.name;
const genre=req.body.genre;

//query the database
const statement =db.prepare('insert into bands(name,genre) values (?,?)');
const result=statement.run(name,genre);
res.json(result);

});

/*start the app*/
app.listen(3000, ()=> {console.log('server started on port 3000')});
