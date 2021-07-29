import React from 'react';
import { useState,useEffect } from 'react'
import Loading from './Loading';
import './App.css';
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'


function App() {
  const[loading,setLoading]=useState(true);
  const[tours,setTour]=useState([]);

  const removeTour=(id)=>{
    const newTour=tours.filter((tour)=>tour.id !== id)
    setTour(newTour);
  }
  



  const fetchTours=async() => {
    setLoading(true);
    try{
      const response= await fetch(url);
      const tours=await response.json();
      setLoading(false);
      setTour(tours);
    }
    catch{
      setLoading(false);
      console.log('error');
    }
  }
  useEffect(() =>{
    fetchTours()
  },[])
  if(loading){
    return(
      <main>
        <Loading/>
      </main>
    )
  }
  if(tours.length===0){
    return(
    <main>
      <div className='title'> 
      <h2> no tours left</h2>
      <button className="btn " onClick={()=> fetchTours()}>Refresh</button>
      </div>

    </main>
    )
  }

  
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />

    </main>
  );
}

export default App;
