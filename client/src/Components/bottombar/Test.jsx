import React, { useState } from 'react';



const Test = () => {

  const [actionStatus, setActionStatus] = useState('Idle');

  const [goal, setGoal] = useState({ x: 0.0, y: 0.0, orientation: { z: 0.0, w: 1.0 } });



  // Define the ROS Bridge WebSocket URL

  const rosBridgeUrl = 'ws://localhost:9090'; // Replace with your ROS 2 WebSocket URL



  const sendGoal = () => {

    const goalMessage = {

      action_client_name: '/navigate_through_poses', // Replace with your action server name

      goal: {

        poses: [

          {

            header: {

              frame_id: 'map', // Replace with your desired frame ID

            },

            pose: {

              position: {

                x: goal.x,

                y: goal.y,

                z: 0.0,

              },

              orientation: {

                x: 0.0,

                y: 0.0,

                z: goal.orientation.z,

                w: goal.orientation.w,

              },

            },

          },

        ],

      },

    };



    // Create a WebSocket connection to the ROS Bridge

    const rosSocket = new WebSocket(rosBridgeUrl);



    // Handle WebSocket open event

    rosSocket.addEventListener('open', () => {

      console.log('Connected to ROS 2 via WebSocket');



      // Send the goal message as JSON

      try {

        rosSocket.send(JSON.stringify(goalMessage));



      } catch (error) {

        console.log(error);

      }

      console.log("hhh");



      // Update action status

      setActionStatus('Sending goal...');

    });



    // Handle WebSocket message event (e.g., for action result)

    rosSocket.addEventListener('message', (event) => {

      const data = JSON.parse(event.data);

      console.log('Received message:', data);



      // Check for action status or result in the received message

      if (data.status) {

        setActionStatus(data.status);

      } else if (data.result) {

        console.log('Action result:', data.result);

        // Handle action result as needed

      }



      // Close the WebSocket connection after receiving the result (if needed)

      rosSocket.close();

    });



    // Handle WebSocket error event

    rosSocket.addEventListener('error', (error) => {

      console.error('WebSocket error:', error);

      // Handle WebSocket errors as needed

    });

  };



  return (

    <div>

      <h1>ROS 2 Action Caller Without roslibjs</h1>

      <div>

        <p>Action Status: {actionStatus}</p>

        <input

          type="number"

          placeholder="Goal X"

          onChange={(e) => setGoal({ ...goal, x: parseFloat(e.target.value) })}

        />

        <input

          type="number"

          placeholder="Goal Y"

          onChange={(e) => setGoal({ ...goal, y: parseFloat(e.target.value) })}

        />

        <button onClick={sendGoal}>Send Goal</button>

      </div>

    </div>

  );

};



export default Test;

