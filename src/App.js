import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import AdminDashboard from "./pages/AdminDashboard";
import CreateProperty from "./pages/CreateProperty";
import UpdateProperty from "./pages/UpdateProperty";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:slug" element={<PropertyDetail />} />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/property/create"
                element={
                  <ProtectedRoute>
                    <CreateProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/property/:slug/edit"
                element={
                  <ProtectedRoute>
                    <UpdateProperty />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
