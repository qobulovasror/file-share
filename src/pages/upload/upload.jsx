import { ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../config/firebase";
import { uploadBytesResumable } from "firebase/storage";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";

function Upload() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [cancelTask, setCancelTask] = useState(false);
  const [protsess, setProtsess] = useState(false);
  const [fileType, setFileType] = useState("public");
  const [fileData, setFileData] = useState({
    name: "",
    keyword: "",
    password: "",
    path: "",
    typePublic: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    setFileData({
        name: e.target[1].value,
        keyword: e.target[2].value,
        typePublic: e.target[3].value,
        password: e.target[4].value
    })

    if (!file) {
        toast.error("plase choose file 🙁");
        return;
    }
    if(!fileData.name ) {
        toast.error("name is required 🙁");
        return;
    }
    if(!fileData.typePublic && !fileData.password){
        toast.error("if type is private, password is required 🙁");
        return;
    }

    setProtsess(true);
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
        if (cancelTask) {
          uploadTask.cancel();
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/canceled":
            toast.error("Upload has been canceled");
            break;
        }
      },
      async () => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setFileData({ ...fileData, path: downloadURL });
        })
        .then(async ()=>{
            try {
              await addDoc(collection(db, "filePath"), {
                name: fileData.name,
                keyword: fileData.keyword,
                createDate: new Date(),
                password: fileData.password,
                path: fileData.path,
                typePublic: fileData.typePublic,
              }).then(() => {
                
                toast.success("Sucsessfully uploaded");
              });
            } catch (err) {
              toast.error(err + " 🙁");
              console.log(err);
            }
        })
        setProtsess(false);
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
        // e.target[3].value = "true";
        e.target[4].value = "";
        setFileData({
            name: "",
            keyword: "",
            password: "",
            path: "",
            typePublic: true,
        })
      }
    );
};
    const formChangeHandler = (e)=>{
        setFileData({
            ...fileData,
            [e.target.name]: e.target.value
        });
    }

  return (
    <div className="card p-1">
      {protsess && (
        <div className="alert alert-warning p-2 m-1" role="alert">
          <p className="text-center">Downloading progress</p>
          <div className="row justify-content-around">
            <div
              className="progress col-md-8 mt-2"
              role="progressbar"
              aria-label="Example with label"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                style={{ width: progressPercent + "%" }}
              >
                {progressPercent}%
              </div>
            </div>
            <button
              type="button"
              className="btn btn-danger col-md-3"
              onClick={() => setCancelTask(!cancelTask)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="app-upload" name="upload_file">
        <form
          className="app__form p-1"
          name="upload_file"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              File
            </label>
            <input type="file" name="file" className="form-control mb-1" id="file" />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              File name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formChangeHandler}
              className="form-control mb-1"
              placeholder="name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="keyword" className="form-label">
              Keyword for found
            </label>
            <input
              type="text"
              className="form-control mb-1"
              id="keyword"
              name="keyword"
              onChange={formChangeHandler}
              placeholder="keyword"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Select the file types{" "}
            </label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="form-select"
              name="type"
              id="type"
            >
              <option value="true">public</option>
              <option value="false">private</option>
            </select>
          </div>
          {fileType !== "public" ? (
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                className="form-control mb-1"
                placeholder="password for download"
              />
            </div>
          ) : (
            <></>
          )}

          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
