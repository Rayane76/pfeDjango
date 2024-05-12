'use client'


import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";


export default function Scanner(){

  const [scannerResult,setScannerResult] = useState(null);
  


  useEffect(()=>{
    const scanner = new Html5QrcodeScanner('reader',{
      qrbox:{
         width: 250,
         height: 250,
      }
      , 
      fps: 5,
    });
    
    scanner.render(success,error);
    
    function success(res){
       setScannerResult(res)
    }
    
    function error(err){
        
    }
  },[])




   setTimeout(() => {
    const vid = document.getElementsByTagName("video");
    if (vid.length >= 2) {
        const secondVideo = vid[1];
        secondVideo.remove();
      } else {
        console.error("Not enough video elements found");
      }
   }, 1201);


    return(
        <div>
           {scannerResult ? 
           <div>Success ! <a href={"http://" + scannerResult}>{scannerResult}</a></div>
           :
            <div id="reader"></div>
           }
           </div>
    )
}