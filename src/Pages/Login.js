
import react from "react";
import { useState } from "react";
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CheckError } from "./CheckError";


export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Send post requset for user to login
  const handleSubmit = (e) => {
    e.preventDefault()
    const credentials = {email, password};
    fetch(`http://sefdb02.qut.edu.au:3001/user/login`, {
      method: "POST",
      headers:{ 
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
    .then(CheckError)
    .then(res => localStorage.setItem("token", res.token))
    .catch((e) => {
      console.log(e.message)
    })
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email address: </label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Login</Button>
      </form>
    </div>
  );
  }

