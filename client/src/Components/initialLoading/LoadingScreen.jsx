// import React, { useState, useEffect } from 'react';
// import MainStatus from './MainStatus';
// import './LoadingScreen.css'
// const LoadingScreen = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 5050); 

//     return () => clearTimeout(timer); 
//   }, []);

//   return (
//     <div className="loading-container">
//       {loading ? (
//         <video className='video' autoPlay loop muted>
//           <source src={process.env.PUBLIC_URL + '/logoanzo.mp4'} type="video/mp4" />
//         </video>
//       ) : (

//         <MainStatus></MainStatus>
//       )}
//     </div>
//   );
// };

// export default LoadingScreen;
import React, { useState, useEffect, useRef } from 'react';

import './LoadingScreen.css';

const LoadingScreen = () => {

  const videoRef = useRef(null);
  const videoSpeed = 6.0;



  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
      videoRef.current.play();
    }
  };

  return (
    <div className="loading-container">
      (
      <video
        className='video'
        autoPlay
        muted
        ref={videoRef}
        onLoadedData={handleLoadedData}
      >
        <source src={process.env.PUBLIC_URL + '/logoanzo.mp4'} type="video/mp4" />
      </video>
      )
    </div>
  );
};

export default LoadingScreen;

