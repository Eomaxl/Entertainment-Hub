import {useEffect, useState} from "react";
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";
import "./Trending.css";

const Trending = () =>{

    const [content, setContent] = useState([]);
    const [page,setPage] = useState(1);
    const terndingUrl = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`
    const fetchTrending = async () => {
        const response = await axios({
            url:terndingUrl,
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
            }
        });
        setContent(response.data.results);
    }
    useEffect(() => {fetchTrending();
        // eslint-disable-next-line
        },[page])
    return(
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {
                    content && content.map((c) => (
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
            <CustomPagination setPage={setPage} />
        </div>
    )
}

export default Trending;