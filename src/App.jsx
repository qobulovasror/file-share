import {Suspense, lazy, useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const Download = lazy(()=>import('./pages/download/download'));
const Upload = lazy(()=>import('./pages/upload/upload'));

function App() {
  const [activeBtn, setActiveBtn] = useState(window.location.pathname==="/download");
  const redirectUrl = (url)=>{
    if(window.location.pathname !== url){
      setActiveBtn(!activeBtn)
    }
  }
  return (
    <Suspense fallback={<>Loading</>}>
      <BrowserRouter>
      <ToastContainer/>
        <nav className="navbar bg-body-tertiary">
          <div className="container">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">File share</span>
            </div>
          </div>
        </nav>
        <div className="container">
          <h3 className='text-center mt-2'>File share app</h3>
          <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Dolorum excepturi et eius soluta cupiditate totam iusto quasi voluptatem sapiente illo?</p>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="card m-2 p-3">
                <div className="d-flex flex-row">
                  <Link to="/download" className={(!activeBtn)? "btn border border-primary w-50 btn-primary": "btn border border-primary w-50"} onClick={()=>redirectUrl('/download')}>Download</Link>
                  <Link to="/upload" className={(activeBtn)? "btn border border-primary w-50 btn-primary": "btn border border-primary w-50"} onClick={()=>redirectUrl('/upload')}>Upload</Link>
                </div>
                <div className="mt-2 p-2 border border-primary rounded">
                  <Routes>
                    <Route path='/' element={<Navigate replace to="/download"/>}/>
                    <Route path='/download' element={<Download/>}/>
                    <Route path='/upload' element={<Upload/>}/>
                  </Routes>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </BrowserRouter>

    </Suspense>
  )
}

export default App
