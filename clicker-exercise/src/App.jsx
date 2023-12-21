import "./App.css";
import Clicker from "./Clicker";
import Counter from "./Counter";
import TogglerCounter from "./ToggleCounter";
import Toggler from "./Toggler";

function App() {
  return (
    <div>
      {/* <Clicker message="HI!!!!" buttonText="Please Click Me" />
      <Clicker message="Please Stop Clicking Me!" buttonText="do not click" /> */}
      {/* <Counter/> */}
      <TogglerCounter/>
    </div>
  );
}

export default App;
