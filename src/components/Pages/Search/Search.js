import {useEffect, useState} from "react";
import {Button, createTheme, Tab, Tabs, TextField, ThemeProvider} from "@mui/material";
import axios from "axios";
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import SearchIcon from "@mui/icons-material/Search";


const Search = () =>{
    const [type, setType] = useState(0);
    const [searchText,setSearchText] = useState("");
    const [page,setPage] = useState(1);
    const [content,setContent] = useState([]);
    const [numOfPages,setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: { main:"#fff"}
        }
    });

    const fetchSearch = async() => {
        try{
            const response = await axios({
                //https://api.themoviedb.org/3/search/movie?query=Sting&include_adult=false&language=en-US&page=1'
                url:`https://api.themoviedb.org/3/search/${type ? "tv":"movie"}?query=${searchText}&include_adult=false&language=en-US&page=${page}`,
                method: "GET",
                headers:{
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
                }
            });
            setContent(response.data.results);
            setNumOfPages(response.data.total_pages);
            console.log("SearchText is :"+searchText);
        } catch (error){
            console.error(error);
        }
    };

    useEffect(()=>{
        window.scroll(0,0);
        fetchSearch();
        // eslint-disable-next-line
    },[type,page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div className="search">
                    <TextField
                        style={{flex: 1}}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        onClick={fetchSearch}
                        variant="contained"
                        style={{marginLeft: 10}}
                    >
                        <SearchIcon fontSize="large"/>
                    </Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{paddingBottom: 5}}
                    aria-label="disabled tabs example"
                >
                    <Tab style={{width: "50%"}} label="Search Movies"/>
                    <Tab style={{width: "50%"}} label="Search TV Series"/>
                </Tabs>
            </ThemeProvider>
            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))}
                {searchText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
        </div>
    )
}

export default Search;