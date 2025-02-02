
import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Pastes from './components/Pastes';
import ViewPaste from './components/ViewPaste';

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:<div>
        <NavBar></NavBar>
        <Home></Home>
      </div>
    },
    {
      path:"/pastes",
      element:<div>
        <NavBar></NavBar>
        <Pastes></Pastes>
        
      </div>
    },
    {
      path:"/pastes/:id",
      element:<div>
        <NavBar></NavBar>
        <ViewPaste></ViewPaste>
        
      </div>
    },
  ]
);
function App() {
  

  return (
    <div>
    <RouterProvider router={router}></RouterProvider>
    </div>
  )
}
export default App;