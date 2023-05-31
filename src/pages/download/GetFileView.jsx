/* eslint-disable react/prop-types */
const GetFileView = (props) => {
  // eslint-disable-next-line react/prop-types
  const { getFile, setGetFile, selectItem, setSelectItem } = props;
  const closeView = ()=>{
    setSelectItem("")
    setGetFile(!getFile)
  } 
  
  return (
    <>
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Download</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeView}
              ></button>
            </div>
            <div className="modal-body">
              <h4>{selectItem.name}</h4>
              <p>{selectItem.description}</p>
              {
                (selectItem?.type =="private")?
                <input
                  type="text"
                  id="password"
                  className="form-control"
                  placeholder="password"
                />
                : <></>
              }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeView}
              >
                Close
              </button>
              <button type="button" className={
                (selectItem?.type =="private")?
                "btn btn-primary disabled": "btn btn-primary"}>
                download file and close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetFileView;