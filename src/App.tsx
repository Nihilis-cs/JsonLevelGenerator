import React from 'react';

import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IsoLayout from './Components/IsoLayout';
import LevelEditor from './Components/LevelEditor';
import LevelParametor from './Components/LevelParametor';

const router = createBrowserRouter([
  {
    path: "/",
    element: <IsoLayout />,
    children: [{
      path: "/leveparametor",
      element: <LevelParametor />,
  }]
  }]);
function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;


