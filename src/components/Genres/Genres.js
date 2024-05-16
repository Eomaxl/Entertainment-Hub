import { useEffect } from "react";
import {Chip} from "@mui/material";
import axios from "axios";

const Genres = ({
                    selectedGenres,
                    setSelectedGenres,
                    genres,
                    setGenres,
                    type,
                    setPage,
                }) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        const response = await axios({
            url:`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`,
            method: "GET",
            headers:{
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODMzODAxODRiYWYzYTczNzdkN2E3Y2U2NmExNDY0NSIsInN1YiI6IjY0MjNlNDIzYzA0NDI5MDI2YjExOTdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zoWlO8e_c4F8y5KakmzSx8Wl00cyZAFtkbnuYJVToFE'
            }
        });
        console.log(response.data.genres);
        //setGenres(response.data.genres);
    };

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({}); // unmounting
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    color="primary"
                    clickable
                    size="small"
                    onDelete={() => handleRemove(genre)}
                />
            ))}
            {genres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    );
};

export default Genres;