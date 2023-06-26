import firebase from "./firebase";
import "firebase/database";
import Thermometer from 'react-thermometer-component'
import './App.css';
import { useEffect, useState } from "react";

function App() {

  const [celsius, setCelsius] = useState(0);
  const [running, setRunning] = useState(1);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    const celsiusRef = firebase.database().ref('temp');
    celsiusRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setCelsius(data);

      if(data > 40.0 && !alertSent) {
        const alert = {
          recipients: "+917017428546",
          message: "Alert! The temperature has gone above 40˚C",
          passcode: "devtyagitest"
        }

        fetch('https://sms-notifications-8534-w2jf0y.twil.io/send-messages', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alert),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setAlertSent(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    })

  }, [alertSent]);

  useEffect(() => {
    const runningRef = firebase.database().ref('running');
    runningRef.set(running);
  }, [running])

  const turnOffMachines = () => {
    setRunning(0);
  }

  const turnOnMachines = () => {
    setRunning(1);
  }

  return (
    <div className="app">
      <h1>Factory Temperature Monitor</h1>
      <div className="main">
        <Thermometer
          theme="dark"
          value={celsius}
          max="90"
          format="°C"
          size="large"
          height="300"
        />
      
        <h2 className="main__info">Current Temperature is :<span className="tempSpan">{celsius}°C</span></h2>

        {alertSent && 
          <div className="alert__sent">
            <h3>The temperature has cross the threshold! An alert has been sent to the operator!</h3>
          </div>
        }

         <div className="toggleButtons">
          {running === 1 ? (
            <div id="app-cover">
            <div className="row">
              <div className="toggle-button-cover">
                  <div className="button r" id="button-8">
                    <input type="checkbox" onClick={turnOffMachines} className="checkbox"></input>
                    <div className="knobs">
                      <span></span>
                    </div>
                    <div className="layer"></div>
                  </div>
              </div>
             
            </div>
          </div>
          ): (
            <div id="app-cover">
            <div className="row">
              <div className="toggle-button-cover">
                  <div className="button r" id="button-8">
                    <input type="checkbox" onClick={turnOnMachines} className="checkbox"></input>
                    <div className="knobs">
                      <span></span>
                    </div>
                    <div className="layer"></div>
                  </div>
              </div>
            
            </div>
          </div>
          )}
          </div>


      </div>
    </div>
  );
}

export default App;



