'use client'
import "../../styles/doctor/home.css";
import { useState , useRef } from "react";

export default function Doctor() {

    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
  
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing the camera: ', err);
      }
    };
  
  
    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    };

  return (
    <>
      <div>
        <div className="homeDiv">
          <form>
          <label>
            Entrer Matricule du patient : 
          </label>
          <input placeholder="matricule ..." required></input>
          </form>
          <label>Ou bien scanner le code QR : </label>
        {stream === null &&   <button className="openCam" onClick={startCamera}>Open Camera</button>}
      {stream && <button className="openCam" onClick={stopCamera}>Close Camera</button>}
      <div>
        <video ref={videoRef} autoPlay  style={stream ? { width: '100%', height:"100vh" , maxHeight: '100vh' } : { width: '0', height: '0' }} />
      </div>

        </div>
      </div>
    </>
  );

}