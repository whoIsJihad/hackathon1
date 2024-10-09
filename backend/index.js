const express=require('express')
const cors=require('cors')
const app=express()
require('dotenv').config()
const port=process.env.PORT || 5000
const {Pool}=require('pg')

const pool=new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
})
app.use(cors())
app.use(express.json())
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


app.get('/api/get',async(req,res)=>{
    try{
        const results=await pool.query('SELECT * FROM items')
        res.json(results.rows)
    }
    catch(err){
        console.log(err.message)
    }
})


app.post('/api/post',async (req,res)=>{
    try{
        const {name}=req.body;
        const newItem=await pool.query('INSERT INTO items (name) VALUES($1) RETURNING *',[name]);
        res.json(newItem.rows)
    }

    catch(err){
        console.log(err.message)
    }
})
module.exports=pool