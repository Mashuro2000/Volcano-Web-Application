import { AgGridReact } from "ag-grid-react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { CheckError } from "./CheckError";


export default function VolcanoList() {
  const columns = [
    { headerName: "Name", field: "name", filter: 'agTextColumnFilter' },
    { headerName: "Region", field: "region", filter: 'agTextColumnFilter' },
    { headerName: "Subregion", field: "subregion", filter: 'agTextColumnFilter' },
    { headerName: "Volcano ID", field: "id", filter: 'agNumberColumnFilter'}
  ];  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [radius, setRadius] = useState("");
  const [rowData, setRowData] = useState([]);

  // Fetches the data from the resource
  const QueryCountryData = (country,radius) => {
    if(radius === ""){
      fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}`)
      .then(CheckError)
      .then((data) =>
        data.map((data) => {
          return{
            name: data.name,
            country: data.country,
            region: data.region,
            subregion: data.subregion,
            id: data.id
          };
        })
      )
      .then((rowData) => setRowData(rowData));
    }else{
      fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}&populatedWithin=${radius}km`)
        .then(CheckError)
        .then((data) =>
          data.map((data) => {
            return{
              name: data.name,
              country: data.country,
              region: data.region,
              subregion: data.subregion,
              id: data.id
            };
          })
        )
        .then((rowData) => setRowData(rowData));
    }
    
}
  return (
    <div className="App">
      <h1>Volcano List</h1>
      <div className="params">
        <div id="form-country">
          <form id="form"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
          <label htmlFor="name">Country: </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => {
              const newName = event.target.value;
              setName(newName);              
            }}
          />
          </form>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
          <label>Populated Within: </label>
          <select
            value={radius}
            onChange={(event) => {
              const newRadius = event.target.value;
              setRadius(newRadius);
            }}
          >
            <option value="">--</option>
            <option value="5">5km</option>
            <option value="10">10km</option>
            <option value="30">30km</option>
            <option value="100">100km</option>
          </select>
          </form>
        </div>
        <Button color="primary" onClick={() => QueryCountryData(name,radius)}>
          Submit
        </Button>
      </div>
      <div
      className="ag-theme-balham"
      style={{
        height: "500px",
        width: "800px"
      }}
      >
      <AgGridReact
        columnDefs={columns}
        rowData={rowData}
        pagination
        paginationPageSize={15}
        onRowClicked={(row) => navigate(`/Volcano?name=${row.data.id}`)}
      />
      </div>
    </div>
  );
    
  }


