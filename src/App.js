import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Home from "./component/home/Home";
import Navbar from "./component/layout/Navbar";
import Classroom from "./component/classroom/Classroom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/classroom" component={Classroom} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
