import { useState } from "react"
import styled from "styled-components"

const SeatItem = styled.div`
    border: 1px solid ${props => props.my_border_color}; // Essa cor deve mudar
    background-color: ${(props) => props.seat_color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

    &:hover{
        color: ${props=> props.my_border_color == 'rgb(247, 197, 43)' ? 'black' : 'white'};
    }

    cursor: pointer;
`;


export default function Seat(props)
{
    const {is_avaiable,name,id} = props;
    const [selected,setSelected] = useState(false);
    let my_color = selected ? 'rgb(26, 174, 158)' : is_avaiable ? '#C3CFD9' : '#FBE192';
    let my_border_color = selected ? 'rgb(14, 125, 113)' : is_avaiable ? 'rgb(123, 139, 153)' : 'rgb(247, 197, 43)';


    function selectSeat()
    {
        if(is_avaiable == false)
        {
            alert('Esse assento não está disponível');
            
            return;
        }

        if(!selected)
        {
            props.updt_seats({name:name,id:id},true);
            // adiciona esse assento a array de assentos selecionados
        }
        else
        {
            props.updt_seats({name:name,id:id},false);

            // remove esse assento a array de assentos selecionados
        }

        setSelected(!selected);
    }
    
    return(
        <SeatItem onClick={selectSeat} my_border_color = {my_border_color} seat_color={my_color}>{name}</SeatItem>
    );


}