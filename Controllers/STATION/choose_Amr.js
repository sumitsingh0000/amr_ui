function findDisplacement({ position, amrPosition }) {

    let x1 = position.x

    let y1 = position.y

    let x2 = amrPosition.x

    let y2 = amrPosition.y



    const deltaX = x2 - x1;

    const deltaY = y2 - y1;



    // Calculate the displacement using the distance formula

    const displacement = Math.sqrt(deltaX ** 2 + deltaY ** 2);



    return displacement;



}


let amrs=[
{
    name:"amr-1",position:{x:0,y:0},isConnected:true,battery:78,
},
{
    name:"amr-2",position:{x:0,y:1},isConnected:false,battery:40,
},
{
    name:"amr-3",position:{x:0,y:1},isConnected:true,battery:100,
},
{
    name:"amr-4",position:{x:0,y:1},isConnected:true,battery:10,
},
{
    name:"amr-5",position:{x:0,y:1},isConnected:true,battery:30,
}

]
function chooseAmr({ amrs, amr_id, position }) {

    if (amr_id) {

        for (let i = 0; i < amrs.length; i++) {

            //console.log(amr_id,amrs[i].amr_id);

            if (amrs[i].amr_id == amr_id) {

                // console.log(amrs[i].IP);

                // return amrs[i].IP

            }

        }

    }

    amrs = amrs.filter((e) => {
        console.log((e.battery >= 40) &&(!e.isBusy));
       return (e.battery >= 40) && (!e.isBusy) && e.isConnected
    })

    for (let i = 0; i < amrs.length; i++) {

        amrs[i].displacement = findDisplacement({ position, amrPosition: amrs[i].position })

    }

    amrs = amrs.sort((a, b) => a.displacement - b.displacement)

    //console.log("not ");
// console.log(amrs);
    return amrs[0].IP



}

chooseAmr({amrs,position:{x:1.67,y:2.53}})


module.exports = { chooseAmr }