import React  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Context from './Global/Context';
import HomeScreen from './HomeScreen/index';
const App=()=>{
  
  
  return (
   <Context>
       <HomeScreen/>
   </Context>
  )
}

export default App
