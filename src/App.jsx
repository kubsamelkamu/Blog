import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import Register from "./components/auth/SignUp";
import Login from "./components/auth/SignIn";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/privateComponent";
import { AuthProvider } from "./contexts/services/Authservice";
import { ThemeProvider } from "./contexts/themecontext";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register/>} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-post"
                  element={
                    <PrivateRoute>
                      <CreatePost />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-post/:id"
                  element={
                    <PrivateRoute>
                      <EditPost />
                    </PrivateRoute>
                  }
                />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
