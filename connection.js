const {Sequelize,DataTypes}=require("sequelize")

const sequelize=new Sequelize("redis","root","nimap123",{
    host:"localhost",
    dialect:"mysql",
    logging:false
})

sequelize.authenticate().then(()=>{
    console.log("DB is connected");
}).catch(err=>{
    console.log("Error :" +err);
})

let Product=require("./models/product")(sequelize,DataTypes)
sequelize.sync()

module.exports={Product}
