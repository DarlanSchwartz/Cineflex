import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useEffect, useState } from "react"
import {Routes, Route, useNavigate,useLocation } from "react-router-dom";
import { GetAllMovies } from "./requests"
import arrow from './Arrow.svg'



export default function App() {
    const [homePageMovies,setHomePageMovies] = useState([]);
    const [sucessInfo,setsucessInfo] = useState([]);
    const navigate= useNavigate();
    let currentLocation = useLocation();

    useEffect(()=> {
        GetAllMovies(updateMovies);
    },[])

    function updateMovies(movies)
    {
        setHomePageMovies(movies);
    }

    return (
        <>
            <NavContainer>
                CINEFLEX
                {currentLocation.pathname != "/" &&  <img data-test="go-home-header-btn" onClick={()=>navigate(-1)} src={arrow}/>}

            </NavContainer>
            
                <Routes>
                    <Route path="/" element={<HomePage movies= {homePageMovies} />}></Route>
                    <Route path="/sessoes/:movieId" element={<SessionsPage/>}></Route>
                    <Route path= "/assentos/:seatsId"  element={<SeatsPage set_info={setsucessInfo} />}></Route> 
                    <Route path="/sucesso" element={<SuccessPage sucess_info={sucessInfo} />}></Route>
                </Routes>
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

    img{
        position:fixed; 
        left:10px; 
        top:20px; 
        cursor:pointer;
         z-index:2;
    }
`
