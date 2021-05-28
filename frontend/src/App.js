import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001" || process.env.ENDPOINT;

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { secure: false, transports: ["websocket"] });
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div>
      <h3 style={{color: response === true ? "green" : "red"}}>
        {response?"The light is on":"The light is off"}
      </h3>
    </div>
  );
}

export default App;