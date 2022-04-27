import { Link, Route, BrowserRouter, Switch  } from "react-router-dom";

import login from './Login';
import chat from './Chat';


function Web() {

  return (
    <div>
    <Route exact path="/">
      <h1>this is web.js</h1>
      <Link to="/login"> link to .. </Link>
      <p></p>
      <Link to="/chat"> Chat .. </Link>
     </Route>
    <Route path="/login" component={ login }></Route>
    <Route path="/chat" component={ chat }></Route>
    </div>
  );
}

export default Web;
