// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar"; // Import Sidebar
// import User from "./pages/User";
// import Roles from "./pages/Roles";

// function App() {
//   return (
//     <Router>
//       <div className="lg:flex md:flex">
//         <Sidebar />

//         <div className="flex-grow overflow-scroll h-screen scrollbar-hide">
//           <Routes>
//             <Route path="/" element={<User />} />
//             <Route path="/roles" element={<Roles />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Scrollbar"; // Import Sidebar
import User from "./pages/Customers";
import Roles from "./pages/Assign";

function App() {
  return (
    <Router>
      <div className="relative h-screen">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2017/11/02/12716-241674181_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div className="relative z-10 md:flex h-full">
          <Sidebar />

          <div className="flex-grow overflow-scroll h-screen scrollbar-hide">
            <Routes>
              <Route path="/" element={<User />} />
              <Route path="/roles" element={<Roles />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
