const express =  require('express');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

const createToken = async (req,res,next)=>{

        const token=await jwt.sign({id:"1234567890987654564321"},"asdfghjkllkjhgfdsaqwertyuiopoiuytrewq",{ expiresIn:60 });
        console.log(token);
        req.token=token;
        next();
}

const verifyToken = async (req,res,next)=>{
    const token=req.cookies.jwtc;
    console.log(token);
    try {
        const verify=await jwt.verify(token,"asdfghjkllkjhgfdsaqwertyuiopoiuytrewq")
        console.log(verify);
        req.verify=verify;
        next();
    } catch (error) {

        res.send(error)
    }
    // const verify=await jwt.verify(token,"asdfghjkllkjhgfdsaqwertyuiopoiuytrewq")
    // console.log(verify);
    // req.verify=verify;

}



app.get('/create',createToken,(req,res)=>{
    // console.log(token);
    const create= req.token;
    res.cookie('jwtc',create,{
        expires: new Date(Date.now()+60000),
        httpOnly:true
    });
    res.send(create);
})
app.get('/verify',verifyToken,(req,res)=>{
    // const verify=req.verify;

    //  console.log(req.cookies.jwtc);
    res.send("verify");
})

app.listen(5000,()=>{
    console.log("listening 5000")
})