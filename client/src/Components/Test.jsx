// import React from 'react'

 // import ROS2D from "ros2d"

 

 // ROS2D.ImageMap = function(options) {
    
 //     options = options || {};

     //     var message = options.message;

 //     var image = options.image;

 //     // save the metadata we need

 //     this.pose = new ROSLIB.Pose({
    
 //       position : message.origin.position,

     //       orientation : message.origin.orientation

 //     });

 //     // set the size

 //     this.width = message.width;

 //     this.height = message.height;

 //     // create the bitmap

 //     createjs.Bitmap.call(this, image);

 //     // change Y direction

 //     this.y = -this.height * message.resolution;

 //     // scale the image

 //     this.scaleX = message.resolution;

 //     this.scaleY = message.resolution;

 //     this.width *= this.scaleX;

 //     this.height *= this.scaleY;

 //     // set the pose

 //     this.x += this.pose.position.x;

 //     this.y -= this.pose.position.y;

 //   };

 //   ROS2D.ImageMap.prototype.__proto__ = createjs.Bitmap.prototype;

 

 // export const Teest = () => {
    
 //   return (
    
     //     <div>Test</div>

     //   )

 // }

 