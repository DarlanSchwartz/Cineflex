import { useLocation } from "react-router-dom";
import styled from "styled-components"

export default function ErrorPage() {

    const status = useLocation().state;

    return (
        <PageContainer>
           <p className="error-status">{status? status.split(',')[0] : 404}</p>
           <p>{status? status.split(',')[1] :'Not found'}</p>
        </PageContainer>
    )
}


const PageContainer = styled.div`

    display:  flex;
    flex-direction:  column;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .error-status{
        color: orange;
        font-size: 90px;
        font-family: 'Roboto';
        text-align: center;
    }

    p{
        
        font-family: 'Roboto';
        font-size: 30px;
        text-align: center;
    }
`;