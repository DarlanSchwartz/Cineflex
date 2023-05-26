import { Link } from "react-router-dom";
import styled from "styled-components"
import loadingGif from '../../loading.gif'
export default function HomePage(props) {

    const { movies} = props;

    return (
        <PageContainer>
           {movies.length > 0 && <p> Selecione o filme</p>}

            <ListContainer> 
                {movies.length > 0 ? movies.map((movie) => 
                <Link key={movie.id} to={`/sessoes/${movie.id}`}>
                    <MovieContainer data-test="movie"  >
                        <img src={movie.posterURL} alt="poster"/>
                    </MovieContainer>
                </Link>
                ): <img className="loading-gif" src={loadingGif}/>}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 90%; /*330px*/
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
    justify-content: center;

    p{
        align-self: center;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .loading-gif{
        width: 300px;
        height: 300px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 10px;
    &:hover img{
        width: 135px;
        height: 200px;
        border-radius: 5px;
    }
    img {
        width: 130px;
        height: 190px;
    }
`