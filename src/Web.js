import { Link, Route, BrowserRouter, Switch  } from "react-router-dom";

import login from './Login';


function Web() {

  return (
    <div>
    <Route exact path="/">
      <h1>this is web.js</h1>
      <Link to="/login"> link to .. </Link>
     </Route>
    <Route path="/login" component={ login }>
    </Route>
    </div>
  );
}

export default Web;
