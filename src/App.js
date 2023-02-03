import React, { useState ,useEffect } from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import axios from 'axios';
import Cloudy from './assets/img/cloudy.gif'
import Rainy from './assets/img/rainy.gif'
import Snow from './assets/img/snowy.gif'
import Sunny from './assets/img/sunny.gif'
import Clear from './assets/img/clear.gif'
import Drizzle from './assets/img/drizzle.gif'
import './App.css';

function App() {
  const[data,setData]=useState([])
  const[location,setLocation]=useState('Baku')
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8d348a62ee12b2bb05648ea0a4a52078`

  const getData = async ()=>{
      const dat = await axios.get(url);
      setData(dat.data);
      
  }

  const weather={
    'Rain':Rainy,
    'Snow':Snow,
    'Sunny':Sunny,
    'Clear':Clear,
    'Clouds':Cloudy,
    'Drizzle':Drizzle
  }

  

  
useEffect(()=>{
  getData()
  
},[])
  

   const keyPress=(event)=>{
     if(event.key==="Enter"){
      getData()
     }
    
   }
    
  

  return (
    
    <div className="app" style={{background:`url("${weather[data?.weather?.[0].main]}") no-repeat center center/cover`}}>
      <div className='bckgrnd-blck'>
      </div>
      <div className='container'>
       <div className='search'>
        <input value={location} type='text' onChange={event=>setLocation(event.target.value)} placeholder="Enter Location" onKeyPress={keyPress}/>
        <AiOutlineSearch onClick={()=>getData()} className="search-ico"  style={{cursor:'pointer'}} size={18} />
       </div>
       

       <div className='main-info'>

       <div className='temp'>
           {
            data.main ? <h1>{parseInt(data.main.temp-273)}°</h1> :null
           }

          </div>


          <div className='location'>
             <p>{data.name}</p>
          </div>
         
          

          
        
       </div>

       <div className='bottom-info'>

        <ul>
          <li>
            <div className='max-min-temp'>
          {
            data.main ? <p>Min-temp:  {parseInt(data.main.temp_min-273)}°</p> :null
          }
           </div>
           </li>


           <li>
           <div className='max-min-temp'>
          {
            data.main ? <p>Max-temp:  {parseInt(data.main.temp_max-273)}°</p> :null
          }
          </div>
           </li>

           <li>
           <div className='decription'>
          {
            data.weather ? <p>Description:  {data.weather[0].main}</p> :null
          }
         </div>
           </li>

          


           <li>
           <div className='wind'>
          {
            data.wind ? <p>Wind Speed:  {data.wind.speed} km/h</p> :null
          }
          </div>
           </li>
        </ul>
       

        
       
          
        

         
       </div>

       </div>
       
     

       
      
    </div>
  );
}

export default App;
