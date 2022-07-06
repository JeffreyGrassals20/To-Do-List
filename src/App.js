import { Routes, Route} from "react-router-dom";
import Welcome from "./components/welcome";
import CreateTask from "./components/tasks/CreateTask";
import GetTasks from "./components/tasks/GetTasks"

function App() {
  return (
   <div className='App'>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/CreateTask" element={<CreateTask />} />
      <Route path="/GetTasks" element={<GetTasks />} />
    </Routes>
   </div>
  );
}

export default App;
 