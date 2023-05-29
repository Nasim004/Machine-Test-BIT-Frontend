import './App.css';
import LoginPage from './pages/UserLogin';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Required, LoginAuth } from '../src/utils/Required'
import { UserProvider } from './context/UserContext';


function App() {

  return (

    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route element={<LoginAuth />}>
              <Route path='/' element={<LoginPage />} />
            </Route>
            <Route element={<Required />}>
              <Route path='/dashboard' element={<AdminDashboard />} />
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </div>

  );
}

export default App;
