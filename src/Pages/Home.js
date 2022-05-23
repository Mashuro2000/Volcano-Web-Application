
import react from "react";
import volcano from "../photos/volcano.jpg"

export default function Home(){

  return(
  <div className="App">
    <h1>Volcanoes of the World</h1>
    <img id="volcano" src={volcano} />
  </div>
);
    
}
