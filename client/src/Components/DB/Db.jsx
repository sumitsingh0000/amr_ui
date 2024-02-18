import React, { useState } from 'react';

import './Db.css'; 
import StationDb from './AmrDB/StationDb';
import AmrDb from './AmrDB/AmrDb';

const Db = () => {
 
  return (

      <div className='db-container'>
      
        <div className='db-new-status'>
          <AmrDb/>
         </div>
     
         <div className='db-station-data'>
         <StationDb />
         <StationDb />
         </div>
      
      </div>

  );
};

export default Db;




