import "./App.css";
import {useSelector} from "react-redux";
import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer/MainContainer";

function App() {
  const theme = useSelector((state) => state.app.theme);
  return (
    <div className={`App ${theme}`}>
      <Header />
      <MainContainer />
    </div>
  );
}

export default App;
