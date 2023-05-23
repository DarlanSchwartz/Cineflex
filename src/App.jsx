import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useEffect, useState } from "react"
import axios from "axios"

axios.defaults.headers.common['Authorization'] = 'sI7b4Z8QE5opnAc5PF2Xgwuz';

export default function App() {
    const [homePageMovies,setHomePageMovies] = useState([]);

    useEffect(()=> {
        axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
        .then(updateMovies)
        .catch(()=> console.log("Deu ruim"));
    },[])


    function updateMovies(movies)
    {
        setHomePageMovies(movies.data);
    }

    function openMovie(movie)
    {
        console.log(movie);
        //Abrir página de sessões de um filme
    }

    return (
        <>
           <NavContainer>CINEFLEX</NavContainer>

            <HomePage openMovie={(m) => openMovie(m)} movies= {homePageMovies} />
            {/* <SeatsPage /> */}
            {/* <SessionsPage /> */}
            {/* <SuccessPage /> */}
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
