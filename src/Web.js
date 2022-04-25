import { Link, Router, Routes, BrowserRouter, Switch  } from "react-router-dom";

import login from './login';


function Web() {

  return (
    <div>
    <h1>this is web.js</h1>
    <BrowserRouter>
          <Link to="/login"> link to </Link>
    </BrowserRouter>
    </div>
  );
}

export default Web;
