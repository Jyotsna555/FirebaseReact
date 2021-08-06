import React, {useState} from "react";
import {storage} from "../firebase/firebase";

function Imagebox(props){
    const [confirm, setConfirm] = useState(false);
    const [hover, sethover] = useState("rgb(218, 218, 218)");

    async function deleteImage(){

        // Create a reference to the file to delete
        const storageRef = storage.ref();
        const deleteRef = storageRef.child("images/"+props.imgName);

        // Delete the file
        deleteRef.delete().then(() => {
            window.alert("Deleted successfully");
            window.location.reload();
          }).catch((error) => {
            console.log("Error");
          });

    }

    function confirmation(){
        setConfirm(true);
    }

    function mouseover(){
        sethover("rgb(184, 184, 184)");
    }
    function mouseout(){
        sethover("rgb(218, 218, 218)");
    }

    return (
        <div className="image-box" onMouseOver={mouseover} onMouseOut={mouseout} style={{backgroundColor: hover}}>
            
            {confirm ? <button className="delete-btn" onClick={deleteImage}>Click to delete</button> 
            :
            <button className="delete-btn" onClick={confirmation}>Delete</button> }
            
            <img className="storedImg" alt="" src={props.img}/>
            <p className="img-name">{props.imgName}</p>
        </div>
    )
}

export default Imagebox;