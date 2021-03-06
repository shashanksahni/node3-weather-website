const geocode =require('./utils/geocode')
const forcast =require('./utils/forcast')
const path = require('path')
const  express =require('express')
const hbs=require('hbs')

const app=express()
const port = process.env.PORT || 3000

//Define Paths for Express Config
const publidDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Define handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publidDirectoryPath))
app.get('',(req,res) =>{
    res.render('index',{
            title: 'Weather',
            name: 'Shashank Sahni'
    })
}
)
app.get('/about',(req,res) =>{
    res.render('about',{
            title: 'About Me',
            name: 'Shashank Sahni'
    })
}
)

app.get('/help',(req,res) =>{
    res.render('help',{
            message: 'Please Search from the help page to get your issue resolved',
            title: 'Help',
            name: 'Shashank Sahni'
    })
}
)

app.get('/weather',(req , res) =>{
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error:'Please provide valid address'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,longitude,location}= {}) => {
        if(error){
            console.log("error in  geocode call method*********************")
            return res.send(error)
        }
        
    locationData={
        latitude:latitude,
        longitude:longitude,
        location:location
    }
    console.log("**********************")
    forcast(locationData ,(error,{descriptions,temperature,feelslike,windspeed}) =>{
        if(error){
            return res.send(error)
        }
        else{

            console.log(locationData.location)

            const weatherDetails= descriptions + ' It is currently ' + temperature + ' degress out. There is a ' + feelslike + '% chance of rain.And with a wind speed of ' + windspeed + "."
            console.log("weatherDetails:" + weatherDetails)
            return res.send(
                {
                    weatherDetails,
                    location
                    
                })
        }          
        })
    })
 
})

app.get('/products',(req , res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide the search term'
        })
    }
    console.log(req.query.search)
    res.send ({
           products:[]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
              ErrorMessage:'Help article not found',
              title:'404',
              name:'Shashank Sahni'
    })
})
 
app.get('*',(req,res) =>{
    res.render('404',{
        ErrorMessage:'Page not found',
        title:'404',
        name:'Shashank Sahni'
})
    })

app.listen(port ,() =>{
    console.log("Server is up and running on prt"  + port)
} )