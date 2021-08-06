import React, {useState, useEffect} from 'react';
import {storage} from "../firebase/firebase";
import Imagebox from "./Imagebox";

function Display(){
    const [show, setShow] = useState(false); 
    const [arr, setArr] = useState([
      {
        url:null,
        imgName:null,
        path:null
      }
    ]);

  async function getImages(){

    //event.preventDefault();
    const storageRef = storage.ref();
    const listRef = storageRef.child("images/");

    listRef.listAll().then(function(result){
        //console.log(result);

        result.items.forEach((imgref) => {
            // console.log(imgref);

            imgref.getDownloadURL().then(res => {
                const imgName = imgref.name;
                const pathname = imgref.fullPath;
                console.log(pathname);
                setArr(prev =>
                    [...prev, {url:res, imgName:imgName, path:pathname}]
                )
            })
        });  
    })

  }  

  useEffect(()=> {
    getImages();
  }, []);

  function toggleImage(){
    setShow(!show);
  }

    return (
      <div className="">
        {show ? <button onClick={toggleImage}> Hide </button> : <button onClick={toggleImage}> Display All Images </button>}
        <br/>
        {show && arr.map((a, index) => {
          if(a.url){
            return (
              <Imagebox
                key={index}
                img={a.url}
                imgName = {a.imgName}
              />
            );
          }
        })
        }

      </div>
    );
}
export default Display;