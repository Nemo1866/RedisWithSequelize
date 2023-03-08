module.exports=(sequelize,DataTypes)=>{
let Products=sequelize.define("product",{
    name:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.STRING
    },
    quantity:{
        type:DataTypes.STRING
    }
},{
    timestamps:false
})
return Products
}