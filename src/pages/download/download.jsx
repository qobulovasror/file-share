import { useState, useEffect } from "react";
import GetFileView from './GetFileView';
import {db} from '../../config/firebase';
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

function Download() {
    const [fileList, setFileList] = useState([]);
    const [getFile, setGetFile] = useState(false);
    const [selectItem, setSelectItem] = useState();
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState({
        name: "",
        keyword: ""
    })
    const viewFile = (item)=>{
        setGetFile(!getFile)
        setSelectItem(item)
    }
    const getFileList = async () =>{
        await getDocs(collection(db, "filePath"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                setFileList(newData)
        })
        .catch(err=>{
          toast.error(err)
        })
    }
    useEffect(()=>{
        setLoad(true)
        getFileList().then(()=>setLoad(false))
    }, []);
  return (
    <>
        {
            getFile && 
            <GetFileView 
                getFile={getFile} 
                setGetFile={setGetFile}
                selectItem={selectItem}
                setSelectItem={setSelectItem}
                fileList={fileList}
                />
        }
      <form className="row" onSubmit={e=>e.preventDefault()}>
        <div className="col-md-6">
          <input
            className="form-control"
            type="search"
            name="search"
            id="search"
            value={search.name}
            onChange={e=>setSearch({...search, name: e.target.value})}
            placeholder="Search..."
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control mb-1"
            type="text"
            name="key"
            id="key"
            value={search.keyword}
            onChange={e=>setSearch({...search, keyword: e.target.value})}
            placeholder="keyword..."
          />
        </div>
        <div className="col-md-2">
            <button type="submit" className="btn btn-primary"><i className="bi bi-search"></i></button>
        </div>
      </form>
      <ul className="list-group list-group">
        {
            load && 
            <li className="list-group-item">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>  
            </li>
        }
        {
            fileList.filter((item)=>{
                if(search.name==="") return true;
                return (item.name.toLowerCase().indexOf(search.name.toLowerCase()))>-1;
              })
            .map(file=>(
                <li key={file.id} className="list-group-item" style={{ cursor: "pointer" }} onClick={()=>viewFile(file)}>
                    <div className="row">
                        <h4 className="col">{file.name}</h4> <p className="col">{Date(file.createDate).slice(4, 25)}</p>
                    </div>
                </li>
            ))
        }
      </ul>
    </>
  );
}

export default Download;
