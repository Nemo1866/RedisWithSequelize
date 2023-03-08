const { Product } = require("../connection")
const redis=require("redis")
const redisClient=redis.createClient()
redisClient.connect()
redisClient.on("connect",(connect)=>console.log("connected"))
redisClient.on("error",(err)=>console.log(err))



module.exports={
    createProduct:async(req,res)=>{
        try {
            let {name,price,quantity}=req.body
            let product=await Product.create(req.body)
            res.json({
                msg:"Sucessfully Created a product"
            })
            
        } catch (error) {
            res.send("Some Error Occured")
            console.log(error);
        }
      
    },getProducts:async(req,res)=>{
        try {
            console.log(1);
            const check = await redisClient.GET("products")
            if(check){
                console.log("Cached");
                return res.send(JSON.parse(check))
            }else{
                let product=await Product.findAll()
                await redisClient.SETEX("products",3600,JSON.stringify(product))
                console.log("Hit");
                res.send(product)

            }
          
            
        } catch (error) {
            res.send("Some Error Occured")
            console.log(error);
        }
    },updateProduct:async(req,res)=>{
        try {
            let id=req.params.id
            let {name,price,quantity}=req.body
            let product=await Product.update({name,price,quantity},{where:{id}})
            res.json({
                msg:"Updated Product"
            })
            
        } catch (error) {
            res.send("Some Error Occured")
            console.log(error);
        }
       
    },removeProduct:async(req,res)=>{
        try {
            let id=req.params.id
        let product=await Product.destroy({where:{id}})
        res.json({
            msg:'Deleted a product'
        }) 
        } catch (error) {
            res.send("Some Error Occured")
            console.log(error);
        }
       
    }
}