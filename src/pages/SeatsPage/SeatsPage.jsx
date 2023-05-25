import { useEffect, useState } from "react"
import styled from "styled-components"
import { GetMovieSeats } from "../../requests";
import { useNavigate, useParams } from "react-router-dom";
import Seat from "./Seat";

export default function SeatsPage(props) {

    const [movieSeats, setMovieSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { seatsId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        GetMovieSeats(Number(seatsId), setMovieSeats);
    }, []);

    function updateSelectedSeats(id, add) {

        if (add == true) 
        {
            setSelectedSeats([...selectedSeats, id]);
        }
        else {
            const seats = [...selectedSeats];
            const newSeats = [];

            seats.forEach(seat => {
                if (seat != id) {
                    newSeats.push(seat);
                }
            });

            setSelectedSeats(newSeats);
        }
    }

    return (
        <PageContainer>
           {movieSeats.length == 0 ? 'Carregando assentos...' :  'Selecione o(s) assento(s)'}
            <SeatsContainer>
                {movieSeats.length == 0 ? '': movieSeats.seats.map(seat => {
                    return <Seat updt_seats={(seat,value) => updateSelectedSeats(seat,value)} key={seat.name} is_avaiable={seat.isAvailable} name={seat.name} />
                })}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle circle_color='rgb(26, 174, 158)' border_color='rgb(14, 125, 113)' />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle circle_color='rgb(195, 207, 217)' border_color='rgb(123, 139, 153)' />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle circle_color='rgb(251, 225, 146)' border_color='rgb(247, 197, 43)' />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." name="cpf" />

                <button onClick={() => {navigate('/sucesso');props.set_info(selectedSeats)} }>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={movieSeats.length != 0 ? movieSeats.movie.posterURL : 'https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif'} alt="poster" />
                </div>
                <div>
                    <p>{movieSeats.length != 0 ? movieSeats.movie.title : 'Carregando...'}</p>
                    <p>{movieSeats.length != 0 ? (movieSeats.day.weekday + ' - ' + movieSeats.name).replace(':', 'h') : ''}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;

    button {
        align-self: center;

        &:hover{
            color: #E8833A;
            border: 1px solid #E8833A;
            background-color: white;
        }
        cursor: pointer;

        transition: all 200ms;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border_color};         // Essa cor deve mudar
    background-color: ${props => props.circle_color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
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