const express=require("express")
const path=require("path")
const hbs=require("hbs")
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")

const app=express()

console.log(__dirname)
const publicPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../views")
const partilsPath=path.join(__dirname,"../partials")

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partilsPath)

app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Raj",
        description:"Know your weather"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Naman",
        description:"Need any help"
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Saurbh",
        description:"This is about me!!"
    })
})

app.get('/weather',(req,res)=>{

    if(req.query.address){
        
        geocode(req.query.address ,(error,{latitude,longitude,location}={})=>{
              
            if(error){
               return  res.send({error})
            }
     
              forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return  res.send({error})
                 }
                return res.send({
                    forcast:forecastData,
                    location,
                    addess:req.query.address
              })
        })

    })
}else{
    res.send({
        error:"Please provide Address to search"
    })
}


    
})



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})