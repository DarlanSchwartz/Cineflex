import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GetAllMovies } from "./requests"



export default function App() {
    const [homePageMovies,setHomePageMovies] = useState([]);
    const [lastInfo,setLastInfo] = useState([]);

    useEffect(()=> {
        GetAllMovies(updateMovies);
    },[])

    function updateMovies(movies)
    {
        setHomePageMovies(movies);
    }

    return (
        <>
            <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            
                <Routes>
                    <Route path="/" element={<HomePage movies= {homePageMovies} />}></Route>
                    <Route path="/sessoes/:movieId" element={<SessionsPage/>}></Route>
                    <Route path= "/assentos/:seatsId"  element={<SeatsPage set_info={setLastInfo} />}></Route> 
                    <Route path="/sucesso" element={<SuccessPage inf={lastInfo} />}></Route>
                </Routes>

            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
