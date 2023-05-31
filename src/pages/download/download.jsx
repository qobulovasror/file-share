import { useState, useEffect } from "react";
import GetFileView from './GetFileView';

function Download() {
    const [fileList, setFileList] = useState([
        {
            name: 'list1',
            id: "123121",
            description: "this is file"
        }
    ]);
    const [getFile, setGetFile] = useState(false);
    const [selectItem, setSelectItem] = useState();
    const viewFile = (item)=>{
        setGetFile(!getFile)
        setSelectItem(item)
    }
    useEffect(()=>{
        setFileList([
            {
                name: 'list1',
                id: "123121",
                description: "this is file",
                link: "url",
                type: "public",
                password: ""
            },
            {
                name: 'list2',
                id: "123122",
                description: "this is file",
                link: "url",
                type: "private",
                password: "1234"
            },
        ])
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
      <form className="row">
        <div className="col-md-6">
          <input
            className="form-control"
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control mb-1"
            type="text"
            name="key"
            id="key"
            placeholder="keyword..."
          />
        </div>
        <div className="col-md-2">
            <button type="submit" className="btn btn-primary"><i className="bi bi-search"></i></button>
        </div>
      </form>
      <ul className="list-group list-group">
        {
            fileList.map(file=>(
                <li key={file.id} className="list-group-item" style={{ cursor: "pointer" }} onClick={()=>viewFile(file)}>
                    {file.name}
                </li>
            ))
        }
      </ul>
    </>
  );
}

export default Download;
