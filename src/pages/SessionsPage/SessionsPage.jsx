import styled from "styled-components"
import {GetOneMovie} from './../../requests.js'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SessionsPage() {

    const [movie,setCurrentLookingMovie] = useState(undefined);
    const {movieId} = useParams();


    useEffect(() => {

        GetOneMovie(Number(movieId),setCurrentLookingMovie);

    },[]);

    return (
        <PageContainer>
            {movie ? <p>Selecione o horário</p> : <p>Carregando..</p>}
            <div>
                {movie && movie.days.map((day) => (<SessionContainer key={day.id}>
                    {day.weekday + ' - ' + day.date}
                    <ButtonsContainer>
                        {day.showtimes.map( (showtime) => 
                        
                        <Link key={showtime.id} to={`/assentos/${showtime.id}`}>
                            <button>{showtime.name}</button>
                        </Link>
                        
                        )}
                    </ButtonsContainer>
                </SessionContainer>))}
            </div>

            <FooterContainer>
                <div>
                    <img src={movie ? movie.posterURL : 'https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif'} alt="Carregando.." />
                </div>
                <div>
                    <p>{movie ? movie.title : 'Carregando..'}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    box-sizing: border-box;
    button {
        margin-right: 20px;
        cursor: pointer;
        box-sizing: border-box;
        &:hover{
            color: #E8833A;
            border: 1px solid #E8833A;
            background-color: white;
        }
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`