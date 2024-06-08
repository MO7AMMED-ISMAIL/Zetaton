import {Route , RouterProvider , createBrowserRouter , createRoutesFromElements} from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import Favorites from './component/Favorites';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path='/home' element={<Home/>}/>
      </>
    )
  )

  return (
    <>
    {/* <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}> */}
      {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
        <RouterProvider router={router}/>
      {/* </div> */}
    {/* </Container> */}
    </>
  );
}

export default App;
