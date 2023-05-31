import { useState } from "react";

/* eslint-disable react/prop-types */
const GetFileView = (props) => {
  // eslint-disable-next-line react/prop-types
  const { getFile, setGetFile, selectItem, setSelectItem } = props;
  const [check, setCheck] = useState(false);
  const [pass, setPass] = useState('');

  const closeView = () => {
    setSelectItem("");
    setGetFile(!getFile);
  };
  const checkPass = () => {
    if (!selectItem.typePublic && pass === selectItem.password) {
      setCheck(true);
    }
  };

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
              <h4><b>Name: </b>{selectItem.name}</h4>
              <p><b>keyword: </b>{selectItem.keyword}</p>
              <p><b>description: </b>{selectItem.description}</p>
              { (!selectItem.typePublic) ? (
                <>
                  <div className="row">
                    <div className="col-md-10">
                      <input
                        type="text"
                        id="password"
                        className="form-control"
                        placeholder="password"
                        value={pass}
                        style={{borderColor: (check)? "#0f0": "#f00"}}
                        onChange={e => setPass(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-primary col-md-2"
                      onClick={checkPass}
                    >
                      <i className="bi bi-check2-square"></i>
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
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
              <a
                type="button"
                target="_blank"
                className={
                  selectItem?.type == "private" && !check
                    ? "btn btn-primary disabled"
                    : "btn btn-primary"
                }
                href={selectItem.path} rel="noreferrer"
              >
                download file and close
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetFileView;
