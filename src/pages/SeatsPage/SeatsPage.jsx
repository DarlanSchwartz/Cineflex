import { useEffect, useState } from "react"
import styled from "styled-components"
import { GetMovieSeats , ReserveSeat  } from "../../requests";
import { useNavigate, useParams } from "react-router-dom";
import Seat from "./Seat";

export default function SeatsPage(props) {

    const [movieSeats, setMovieSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userCpf, setUserCpf] = useState('');
    const [userName, setUserName] = useState('');
    const { seatsId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        GetMovieSeats(Number(seatsId), setMovieSeats);
    }, []);

    function updateSelectedSeats(seatObj, add) {

        if (add == true) {
            setSelectedSeats([...selectedSeats, seatObj]);
        }
        else {
            const seats = [...selectedSeats];
            const newSeats = [];

            seats.forEach(seat => {
                if (seat.id != seatObj.id) {
                    newSeats.push(seat);
                }
            });

            

            setSelectedSeats(newSeats);
        }
    }

    function formatarCPF(value) {
        // Remover caracteres não numéricos
        var cpf = value.replace(/\D/g, '');
  
        // Verificar se o CPF está vazio
        if (cpf === '') {
          return cpf;
        }
  
        // Adicionar a formatação conforme o CPF é digitado
        if (cpf.length > 3) {
          cpf = cpf.substring(0, 3) + '.' + cpf.substring(3);
        }
        if (cpf.length > 7) {
          cpf = cpf.substring(0, 7) + '.' + cpf.substring(7);
        }
        if (cpf.length > 11) {
          cpf = cpf.substring(0, 11) + '-' + cpf.substring(11);
        }
  
        // Atualizar o valor do campo de entrada
         return cpf;
      }

    return (
        <PageContainer>
            {movieSeats.length == 0 ? 'Carregando assentos...' : 'Selecione o(s) assento(s)'}
            <SeatsContainer>
                {movieSeats.length == 0 ? '' : movieSeats.seats.map(seat => {
                    return <Seat updt_seats={(seat, value) => updateSelectedSeats(seat, value)} key={seat.name} is_avaiable={seat.isAvailable} name={seat.name} id={seat.id} />
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

            <FormContainer onSubmit={(e) => {
                

                    if(userCpf == '' || userName == '' || userCpf.length < 11)
                    {
                        e.preventDefault();
                        return;
                    }

                    if(userName.trim().length === 0)
                    {
                        e.preventDefault();
                        return;
                    }

                    props.set_info(
                        {
                            seats: selectedSeats,
                            title: movieSeats.movie.title,
                            cpf: userCpf, 
                            username: userName,
                            date: movieSeats.day.date,
                            time: movieSeats.name
                        });

                    
                    let seatIds = [];
                    let finalcpf =  userCpf.replace(/[.-]/g, "");

                    selectedSeats.forEach(seat => {
                        seatIds.push(seat.id);
                    });
                    
                    const obj = {
                            ids: seatIds,
                            name: userName,
                            cpf:finalcpf
                    };

                    e.preventDefault();

                    ReserveSeat(obj,() => navigate('/sucesso'));
                }}>
                <label htmlFor="nome">Nome do Comprador:</label>
                <input data-test="client-name" type="text" pattern="^\s*\S.*$" required placeholder="Digite seu nome..." id="nome" name="nome" value={userName}  onChange={(e) => setUserName(e.target.value)} />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input data-test="client-cpf" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" required placeholder="Digite seu CPF..." id="cpf" name="cpf" value={formatarCPF(userCpf)} onChange={(e) => setUserCpf(e.target.value.length < 14 ? e.target.value : e.target.value.substring(0,14))} />

                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
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
const FormContainer = styled.form`
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