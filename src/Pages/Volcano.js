import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

export default function Volcano() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [volcanoData, setVolcanoData] = useState([]);
    const id = searchParams.get("name");
    const token = localStorage.getItem("token");
    const [center, setCenter] = useState([0,0])
    const [loading, setLoading] = useState(true);

    // Graph Options 
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title:{
          display: true,
          text: "Population Density",
        },
      },
    };


    const VolcanoData = [
      {
        distance: '5km',
        population: volcanoData.population_5km
      },
      {
        distance: '10km',
        population: volcanoData.population_10km
      },
      {
        distance: '30km',
        population: volcanoData.population_30km
      },
      {
        distance: '100km',
        population: volcanoData.population_100km
      },
    ]
    
    // set default value of Graph for initial render
    const [volcanoPopDensity, setVolcanoPopDensity] = useState({
      labels: VolcanoData.map((data) => data.distance),
          datasets: [{
            label: 'Population',
            data: [0,0,0,0],
            backgroundColor: 'rgba(0, 0, 0, 1)',
          }]
    })   

    // Data fetched from api
    const viewPopDensity = () => {
      setVolcanoPopDensity({
        labels: VolcanoData.map((data) => data.distance),
          datasets: [{
            label: 'Population',
            data: VolcanoData.map((data) => data.population),
            backgroundColor: 'rgba(0, 0, 0, 1)',
          }]
      })
    }
    
      // Fetch data for individual volcano
    useEffect(() => {
      fetch(`http://sefdb02.qut.edu.au:3001/volcano/${id}`, {
        method: "GET",
        headers: token !== null ? {
          "accept": "application/json",
          Authorization: `Bearer ${token}`
        } : {}
      })
      .then((res) => {
        if(!res.ok){
          throw Error("Could not fetch data")
        }
        return res.json()
      })
      .then(res => {
        setVolcanoData(res)
        setLoading(false)
      } 
      )
      .catch((e) => {
        console.log(e.message)
      })
    }, []);   
      
      
      if(loading){
        return <p>Loading...</p>
      }else if(token === null){
        return (
          <div className="App">
            <h1>Volcano: {volcanoData.name}</h1>
            <div className="volcano-contents">
              <div id="volcano-data">
                <p className="country-data">Country: {volcanoData.country}<br/>
                  Region: {volcanoData.region}<br/>
                  Subregion: {volcanoData.subregion}<br/>
                  Last Eruption: {volcanoData.last_eruption}<br/>
                  Summit: {volcanoData.summit} m<br/>
                  Elevation: {volcanoData.elevation} ft<br/>
                </p>
              </div>  
              <div id="volcano-map">
                <Map 
                  height={280} 
                  width={950}
                  center={center} 
                  defaultZoom={10} 
                  onBoundsChanged={() => {
                    setCenter([parseFloat(volcanoData.latitude), parseFloat(volcanoData.longitude)])
                  }}
                >
                  <Marker
                    width={50}
                    anchor={center}
                  />
                </Map>
              </div>
            </div>
            <Button
              color="info"
              size="sm"
              className="mt-3"
              onClick={() => navigate("/VolcanoList")}
            >
              Back
            </Button>
          </div>
        );
      }else{
        return(
          <div className="App">
            <h1>Volcano: {volcanoData.name}</h1>
            <div className="volcano-contents">
              <div id="volcano-data">
                <p className="country-data">Country: {volcanoData.country}<br/>
                  Region: {volcanoData.region}<br/>
                  Subregion: {volcanoData.subregion}<br/>
                  Last Eruption: {volcanoData.last_eruption}<br/>
                  Summit: {volcanoData.summit} m<br/>
                  Elevation: {volcanoData.elevation} ft<br/>
                </p>
              </div>  
              <div id="volcano-map">
                <Map 
                  height={280} 
                  width={950}
                  center={center} 
                  defaultZoom={10} 
                  onBoundsChanged={() => {
                    setCenter([parseFloat(volcanoData.latitude), parseFloat(volcanoData.longitude)])
                  }}
                >
                  <Marker
                    width={50}
                    anchor={center}
                  />
                </Map>
              </div>
            </div>
            <Button
              color="info"
              size="sm"
              className="mt-3"
              onClick={() => viewPopDensity()}
            >
              View population density
            </Button>
            <div className="chart">
              <Bar options={options} data={volcanoPopDensity}/>
            </div>
          </div>
        );
    }
  }