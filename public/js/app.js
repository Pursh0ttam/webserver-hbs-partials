const { default: axios } = require("axios");

let myform = document.getElementById("myform");

myform.addEventListener("submit",async (e) => {
  
  e.preventDefault();
    let input = document.getElementById("input").value;
    console.log(input);

  try{
    console.log(`http://localhost:5000/weather?address=${input}`);
    
      let {data}= await axios.get(`http://localhost:5000/weather?address=${input}`)
      console.log(data);
      

  }catch(err){
    console.log(err);
    
  }


//  try{
  
//     fetch(`http://localhost:5000/weather?address=${input}` ).then((data) => {
//         if(data.error){
//             console.log(data.error);
//           }else{
//               data.json().then((data) => {
//                   console.log(data.location);
//                   console.log(data.forecast);
//                 });
//               }
            
//             }).catch(err=>console.log("this ",err))  ;
//           }catch(err){
//             console.log(err);
            
//           }
});
          