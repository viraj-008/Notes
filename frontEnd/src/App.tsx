import Notes from "./compo/Notes";
import LoginForm from "./compo/Login";
import Register from "./compo/Register";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App:React.FC =()=> {
  return (
    <div className="bg-gradient-to-r from-red-500 to-yellow-500 " >
       <div>
       <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<LoginForm  />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/allnotes" element={<Notes/>} />
        
      </Routes>
    </Router>
    </div> 
    </div>
  );
}

export default App;
