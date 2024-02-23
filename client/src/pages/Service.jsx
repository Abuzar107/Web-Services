import React, { useEffect, useState } from 'react'

function Service() {

  const [services , setServices] = useState([]);

  useEffect(() => {
    getServices();
  }, [])

  const getServices = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/data/services', {
          method: 'GET',
        })
        
        if(response.ok){
          const jsonData = await response.json();
          setServices(jsonData.response);
        }
  
      } catch (error) {
        console.log("services front end",error);
      }
  }



  return (
    <section className='section-services'>
      <div className="container">
        <h1 className='main-heading'>Services</h1>
      </div>

      <div className="container grid grid-three-cols">

        {services.map((cueElem , index) => {
          return(
          <div className="card" key={index}>
          <div className="card-img">
            <img src="images/design.png" alt="desiner" width="200" />
          </div>

          <div className="card-details">
            <div className="grid grid-two-cols">
                <p>{cueElem.provider}</p>
                <p>{cueElem.price}</p>
            </div>
            <h2>{cueElem.service}</h2>
            <p>{cueElem.description}</p>
          </div>
        </div>
          )
        })}
      </div>
    </section>
  )
}

export default Service