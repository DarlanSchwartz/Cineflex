import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'sI7b4Z8QE5opnAc5PF2Xgwuz';


export function GetOneMovie(id,callback)
{
    
    
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`)
        .then((response) => callback(response.data))
        .catch((response)=> {
            callback(response);
        });
}

export function GetAllMovies(callback)
{
    axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
    .then((response) => callback(response.data))
    .catch(()=> alert("Não foi possivel buscar os filmes no servidor"));
}

export function GetMovieSeats(id,callback)
{
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`)
    .then(response => callback(response.data))
    .catch( (error)=> {
        callback(error);
    });
}

export function ReserveSeat(obj,callback)
{
    axios.post(`https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`,obj)
    .then(() => {callback()})
    .catch( (error)=> {
        callback(error);
    });
}