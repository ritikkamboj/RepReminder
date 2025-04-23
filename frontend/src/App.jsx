import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ActivePage from "./pages/ActivePage";
import ExpiringPage from "./pages/ExpiringPage";
import ExpiredPage from "./pages/ExpiredPage";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Other routes will go here */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
  path="/active"
  element={
    <ProtectedRoute>
      <ActivePage />
    </ProtectedRoute>
  }
/>

<Route
  path="/expiring"
  element={
    <ProtectedRoute>
      <ExpiringPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/expired"
  element={
    <ProtectedRoute>
      <ExpiredPage />
    </ProtectedRoute>
  }
/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
