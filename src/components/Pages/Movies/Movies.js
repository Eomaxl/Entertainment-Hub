import axios from "axios";
import {useEffect, useState} from "react";
import SingleContent from "../../SingleContent/SingleContent";
import "./Movie.css";
import CustomPagination from "../../Pagination/CustomPagination";
const Movies = () => {
    const [page,setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const fetchMovies = async() =>{
        const movieUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`
        const response = await axios({
            url: movieUrl,
            method: "GET",
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
            }
        });
        setContent(response.data.results);
        setNumOfPages(response.data.total_pages);
    }
    useEffect(()=>{
        fetchMovies()
        // eslint-disable-next-line
        },[page])
    return(
        <div>
            <span className="pageTitle">Movies</span>
            <div className="movie">
                {   content && content.map((c)=>(
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    ))
                }
            </div>
            {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />)}
        </div>
    )
}

export default Movies;