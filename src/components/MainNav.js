import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {Whatshot} from "@mui/icons-material";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './MainNav.css';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const history = useNavigate();
    useEffect(()=>{
        if(value === 0){
            history("/");
        } else if (value === 1){
            history("/movies")
        } else if (value === 2){
            history("/series")
        } else if (value === 3){
            history("/search")
        }
    },[value, history]);

    return (
        <Box sx={{ width: 500 }}>
            <BottomNavigation
                showLabels
                value={value}
                className='main-nav'
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Trending" icon={<Whatshot/>} />
                <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
                <BottomNavigationAction label="TV Series" icon={<LiveTvIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
            </BottomNavigation>
        </Box>
    );
}
