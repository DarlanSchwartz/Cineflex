import axios from "axios";
axios.defaults.headers.common['Authorization'] = 'sI7b4Z8QE5opnAc5PF2Xgwuz';


export function GetOneMovie(id,callback)
{
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`)
        .then((response) => callback(response.data))
        .catch(()=> {
            if(callback === undefined)
            {
                alert("É necessário ter uma função como parâmetro ao pedir 1 filme para o servidor, parametros são: iddofilme, funcaoparaexecutar");
            }
            else
            {
                alert("Não foi possivel encontrar o filme com id: " + id + " no servidor!");
            }
        });
}

export function GetAllMovies(callback)
{
    axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
    .then((response) => callback(response.data))
    .catch(()=> alert("Não foi possivel buscar os filmes no servidor"));
}