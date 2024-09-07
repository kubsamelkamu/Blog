import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import { ThemeProvider } from "./contexts/themecontext";

function App() {
  return(
    <Router>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/blog" element={<Blog/>}/>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </ThemeProvider>
    </Router>
  )
  
}

export default App;