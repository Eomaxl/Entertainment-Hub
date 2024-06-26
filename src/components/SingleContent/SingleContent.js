import {img_300, unavailable} from "../Config/Config";
import "./SingleContent.css";
import {Badge} from "@mui/material";

const SingleContent = ({id, poster,title,date,media_type,vote_average}) => {
    return (
        <div className="media">
            <Badge badgeContent={vote_average} color={vote_average >6 ? 'primary':'secondary'}/>
            <img className="poster" src={ poster ? `${img_300}/${poster}` : unavailable}  alt={title}/>
            <b className="title">{title}</b>
            <span className="subSection">
                <span className="subTitle">{media_type === 'tv' ? "TV Series" : "Movie"}</span>
                <span className="subTitle">{date}</span>
            </span>
        </div>
    )
}

export default SingleContent;

