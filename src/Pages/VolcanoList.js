import { AgGridReact } from "ag-grid-react";
import React from "react";
import { useState, useEffect } from "react";
import { DropdownItem, DropdownMenu, Dropdown, DropdownToggle } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function VolcanoList(props) {
  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion" },
  ];  
  const [name, setName] = useState("");
  
    return (
      <div className="App">
        <h1>Volcano List</h1>
        <div className="params">
          <div id="form-country">
            <form
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
          </div>
          <div id="dropdown">
            <p id="radius">Radius:</p>
            <Dropdown toggle={function noRefCheck(){}}>
              <DropdownToggle caret>
                Select Radius
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem text>
                  5km
                </DropdownItem>
                <DropdownItem text>
                  10km
                </DropdownItem>
                <DropdownItem text>
                  30km
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </div>
        </div>
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