import React, {useState} from 'react';
import {storage} from "../firebase/firebase";
import Display from "./Display";

function Home(){
    let c=0;
    const [title, setTitle] = useState([]);
    const [temp, setTemp] = useState("");
    const [file, setFile] = useState([]);
    const [check, setCheck] = useState(false);

    function handleTitle(event){
        const titleName = event.target.value;
        setTemp(titleName);
    }

     function handleFile(event){
        for(let i=0; i<event.target.files.length; i++){
            const myfile = event.target.files[i];
            setFile(prev => [...prev, myfile]);
        }
    }

    function pushTitle(event){
        event.preventDefault();
        setTitle((prev) => {
            return [...prev, temp ]
        });
    }

    async function uploadhelper(){
        for(let i=0; i<file.length; i++){
            console.log(file[i]);
            const myfile = file[i];
            if(!title[i] || title[i]===" "){
                window.alert("Please input a name!");
                return;
            }
            const mytitle = title[i];

            const uploadTask = storage.ref(`images/${mytitle}`).put(myfile);

            uploadTask.on(
              "state_changed",
    
              (progress) => {
                console.log("Upload in progress");
              },
    
              (err) => {
                console.log(err);
              },
    
              () => {
                storage
                  .ref("images")
                  .child(mytitle)
                  .getDownloadURL()
                  .then((url) => {
                      console.log("UPLOADED!");
                      setCheck(true);

                        if(i===file.length-1){ 
                            window.alert("Uploaded");
                            window.location.reload();
                        }
                  })
              }

            );
        }

    }
    function uploadImage(event){
        event.preventDefault();

        if(file.length===0){
            window.alert("Please select files first!");
        }else{
            uploadhelper();            
        }
        

    }


    return (
        <div className="upload-box">
            <h1 className="pageHeading">Upload photos here:</h1>
            <form>
                <input multiple onChange={handleFile} name="file" type="file" placeholder="image"/>
                <br/><br/>
                {file.map((f, index) => {

                    return (
                        <div key={c++}>
                            <label className="label" htmlFor={index}>Image {index+1}</label>
                            <input onChange={handleTitle} name={index} type="text" placeholder={f.name} autoComplete="off"/>
                            <button onClick={pushTitle}>Save</button>
                         <br/>
                        </div>
                    ) 
                })
                }
                {title.map(t => {
                    return (
                        <p className="label" key={c++}>{t}</p>
                    )
                })}
                
                <button className="upload-img" onClick={uploadImage}>Upload</button>
            </form>
            <br/><br/>
            <Display/>
        </div>
    )
}
export default Home;