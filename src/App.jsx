import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Music from "./pages/Music";
import Release from './pages/Release';
import Art from "./pages/Art";
import Header from "./components/Header";
import Footer from './components/Footer';

export default function App() 
{
    return (
        <>
        <BrowserRouter>



            <div className="fixed inset-0 pointer-events-none z-[-2] opacity-[0.03]" 
            style={{ backgroundImage: `url("/imgs/etching.png")`}}>
            </div>

            <Header/>    

            <main>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/music/:musicSlug" element={<Release key={window.location.pathname} />} />
                    <Route path="/art" element={<Art />} />
                </Routes>
            </main>

            <Footer/>  
            
        </BrowserRouter>
        </>
    );
}