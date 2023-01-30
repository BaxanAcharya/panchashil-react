import {
  collection, doc, getDocs, orderBy,
  query, setDoc, where
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { db } from "../../utils/config/firebase";

const Index = () => {
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleFileChange = (e) => {
    if (e.target.files.length !== 1) {
      return alert("Please select one excel file");
    }

    const fileType = e.target.files[0].name;
    const types = fileType.split(".");
    if (types[1] !== "xlsx") {
      alert("You can upload excel files only !!!");
      ref.current.value = "";
    } else {
      setFile(e.target.files[0]);
    }
  };


  const importResult=()=>{
    try {
      setLoading(true)
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
  
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
  
          const wb = XLSX.read(bufferArray, { type: "buffer" });
  
          const wsname = wb.SheetNames[6];
  
          const ws = wb.Sheets[wsname];
  
          const data = XLSX.utils.sheet_to_json(ws);
  
          resolve(data);
        };
  
        fileReader.onerror = (error) => {
          setLoading(false);
          reject(error);
        };
      });
  
      promise.then(async d=>{
        let className="P.NURSERY";
        const q = query(
          collection(db, "subjects"),
          orderBy("order", "asc"),
          where("class", "==", className));
  
          let subjects=[]
  
          const querySnapshot = await getDocs(q);
          if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach((doc) => {
              subjects.push(doc.data().subjectName)
            });
          }

          // console.log(subjects)
          // return;
          
            d.forEach( async data=>{
              let sutdentName=data["Students Name"].trim();    
                const queryS = query(
                  collection(db, "students"),
                  where("className", "==", className),
                  where("fullName","==", sutdentName)
                  );
                
                  const snap = await getDocs(queryS);
                  snap.forEach(docsss=>{
                    // console.log(docsss.data().fullName)
                   
                    let att={}
                    att["attendence"]=data["Attendance"];
                     const examRef = doc(db, "DSZiwfID74OiCetHOsnT", docsss.id);
                    setDoc(examRef, att, { merge: true });
                    subjects.forEach(s=>{
                      let obj={}
                      obj[s]=data[s]
                       const examRef = doc(db, "DSZiwfID74OiCetHOsnT", docsss.id);
                   
                    setDoc(examRef, obj, { merge: true });
                    console.log(docsss.data().fullName)
                 
                    })     
                  }) 
            })
        setLoading(false)
      }).catch(err=>{
        setLoading(false)
        alert(err);
      })
      
    } catch (error) {
      setLoading(false)
    }

  }
  return (
    <>
      {/* <h1>asdasdasd</h1> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
          loading ? "loading....": <>   <input ref={ref} type={"file"} onChange={handleFileChange} />
          <button disabled={!ref.current?.value} onClick={importResult}>Import</button></>
        }
     
      </div>

      {/* <Admission /> */}
    </>
  );
};

export default Index;
