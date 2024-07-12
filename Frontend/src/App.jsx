import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SpellingList from './componets/SpellingList';
import AddSpelling from './componets/AddSpelling';
import EditSpelling from './componets/EditSpelling';
import SearchSpelling from './componets/SearchSpelling';
import Home from "./pages/Home";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path="/add" element={<AddSpelling />} />
                    <Route path="/search" element={<SearchSpelling />} />
                    <Route path="/edit/:word" element={<EditSpelling />} />
                 
                </Routes>
            </div>
        </Router>
    );
};

export default App;
