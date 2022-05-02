import { AgGridReact } from "ag-grid-react";
import react from "react";
import { useState, useEffect } from "react";

export default function VolcanoList(props) {
  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion" },
  ];  
    return (
      <div className="App">
        <h1>Volcano List</h1>

      </div>
    );
  }

function quereyCountrydata(country, radius){
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch("http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}&populatedWithin=${radius}")
      .then((res) => res.json())
      .then((data) => data.works)
      .then((works) =>
        works.map((work) => {
          return{
            name: work.name,
            country: work.country,
            region: work.region,
            subregion: work.subregion
          };
        })
      )
      .then((rowData) => setRowData(rowData));
  }, []);
}