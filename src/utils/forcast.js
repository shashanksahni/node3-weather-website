const request =require('request')

const forcast=({latitude , longitude},callback) =>{
const url ='http://api.weatherstack.com/current?access_key=2a27b42b15929ffb91ed7b75111c238a&query='+latitude+','+longitude+'$units=s'
      console.log(url)
      console.log("latitude in forecast method" + latitude)
      console.log("longitude in forecats method" + longitude)
      request({ url,json :true } , (error ,{body}) => {  
      //console.log(response.body) 
      if(error){
        callback('unable to connect to weather services',undefined)
      }else if(body.error){
        callback("unable to find the temperature of the response",undefined)
      }else{
        descriptions=body.current.weather_descriptions[0]
        temperature=body.current.temperature
        feelslike=body.current.feelslike
        weatherParameter ={
            descriptions,
            temperature,
            feelslike
        }
        callback(undefined,weatherParameter )
            } 
      })
}
module.exports =forcast