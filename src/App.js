import "./App.css";
import { Route, Switch } from "react-router";
import Posts from "./pages/Posts/Posts";
import Profile from "./pages/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/home";
import NavigationBar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route strict exact path="/" component={Home} />
        <Route strict exact path="/posts" component={Posts} />
        <Route strict exact path="/signup" component={Signup} />
        <Route strict exact path="/signin" component={Signin} />
        <Route strict exact path="/profile/:email" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
