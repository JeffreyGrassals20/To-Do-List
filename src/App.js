import { Routes, Route} from "react-router-dom";
import Welcome from "./components/welcome";
import CreateTask from "./components/tasks/CreateTask";

function App() {
  return (
   <div className='App'>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/CreateTask" element={<CreateTask />} />

    </Routes>
   </div>
  );
}

export default App;
 