import { ref, getDownloadURL } from "firebase/storage";
import {useState} from 'react'
import { storage } from '../../config/firebase';
import { uploadBytesResumable } from 'firebase/storage';

function Upload() {
    const [progressPercent, setProgressPercent] = useState(0);
    const [cancelTask, setCancelTask] = useState(false); 
    const [protsess, setProtsess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        
        if (!file) return null;
        setProtsess(true)
        const storageRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",
          (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
              setProgressPercent(progress)
              if(cancelTask){
                  uploadTask.cancel();
              }
          },
          (error) => {   
            switch (error.code) {
              case 'storage/canceled':
                alert('Upload has been canceled')
                break;
            }
          },
          () => {
            e.target[0].value = ''
            setProtsess(false)
            getDownloadURL(storageRef).then((downloadURL) => {
              console.log(downloadURL)
            })
          }
        )
      }
    return (
        <div className="card p-1">
            {
                protsess && 
                <div className="alert alert-warning p-2 m-1" role="alert">
                    <p className="text-center">Downloading progress</p>
                    <div className="row justify-content-around">
                        <div className="progress col-md-8 mt-2" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{width: progressPercent+"%"}}>{progressPercent}%</div>
                        </div>
                        <button type="button" className="btn btn-danger col-md-3" onClick={()=>setCancelTask(!cancelTask)}>Cancel</button>
                    </div>
                </div>
            }
            <div className="app-upload" name='upload_file'>
                <form className='app__form p-1' name='upload_file' onSubmit={handleSubmit}>
                    <input type='file' className="form-control mb-1"/>
                    <input type="text" className="form-control mb-1" placeholder="name"/>
                    <input type="text" className="form-control mb-1" placeholder="keyword for for found"/>
                    <input type="text" className="form-control mb-1" placeholder="password for download"/>
                    <button type='submit' className="btn btn-primary">Upload</button>
                </form>
            </div>
        </div>
      )
}

export default Upload;