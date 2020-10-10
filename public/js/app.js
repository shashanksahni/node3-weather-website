

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//         response.json().then((data) => {
//                 console.log(data)
//         }
// )})
console.log('before URL')
//url='https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?access_token=pk.eyJ1Ijoic2hhc2hhbmtzYWhuaSIsImEiOiJja2Zya3U0bjQwMGs5MnFxMjZvcnFxMWdyIn0.7lpiwUVLSkw4WupSzUNIYA&limit=1'
//var request = new Request('url', json :true)


// console.log('after URL')
// fetch(url).then((response) =>{
//     console.log('+++++++++++++++')
//   if(response.ok){
//          response.json().then((data) => {
//          console.log('+++++++++++++++')
//               console.log(data)
//               console.log(data.features[0].center[1])
//               console.log(data.features[0].center[0])
//               console.log(data.features[0].place_name)
//               weatherParameter ={
//                 latitude:data.features[0].center[1],
//                 temperature:data.features[0].center[0],
//             }
//         })}
//         else{
//                 console.log("Their was no response")
//         } 
// })


//  fetch('http://localhost:3000/weather?address=Boston').then((response) =>{
    
//          response.json().then((data) => {
//              if(data.error){
//                     console.log("response is not ok")    

//              } else{
//                  console.log("********************")
//                  console.log(data)
//                  console.log(data.location)
//              }
//          }
//          )})
    
   const weatherForm=document.querySelector('form')
   const search=document.querySelector('input')
   const messageOne=document.querySelector('#message-1')
   const messageTwo=document.querySelector('#message-2')
   

   weatherForm.addEventListener('submit',(e)  =>{
          e.preventDefault()
          messageOne.textContent= 'Loading Weather Information .........'
          messageTwo.textContent=' '
          console.log(messageOne.textContent)
          messageTwo.textContent= ' '
          const location =search.value
          console.log(location)
    url='/weather?address=' + location
    console.log(url)
    fetch(url).then((response) =>{
        response.json().then((data) => {
            console.log("++++" + data)
            if(data.error){
                messageOne.textContent= data.error
                   console.log(data)    
            } else{
                console.log("********************")
                console.log(data)
                messageOne.textContent= "Temperature of the loccation is " + data.temperature + " Feel like Temperature is "  + data.feelslike
                messageTwo.textContent=data.location
                console.log(data.location)
            }
        }
        )}).catch((error) => {
            // Only network error comes here
          })  
   })