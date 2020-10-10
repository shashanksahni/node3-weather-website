const request =require('request')

const geocode = (address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)  + '.json?access_token=pk.eyJ1Ijoic2hhc2hhbmtzYWhuaSIsImEiOiJja2Zya3U0bjQwMGs5MnFxMjZvcnFxMWdyIn0.7lpiwUVLSkw4WupSzUNIYA&limit=1'
    console.log(url)
  
    request({ url : url,json :true } , (error ,{body}) => {  
        console.log(body)   
        console.log(body.features[0])
    if(error){
             callback('unable to connect to location services',undefined)
         }else if(body.features[0] === undefined){
                error={
                        error:'Unable to find location.Try another search ...',
                     }
             callback(error,undefined)
         }else{
            latitude=body.features[0].center[1]
            longitude=body.features[0].center[0]
            location=body.features[0].place_name
             geoCode={
                 latitude,
                 longitude,
                 location
             }
             callback(undefined,geoCode)  
         }
     })
 }
 module.exports =geocode
