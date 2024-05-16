import {createMuiTheme, ThemeProvider} from "@mui/material";
import Pagination from "@mui/lab/Pagination";
const darkTheme = createMuiTheme({
    palette: {
        type: "dark"
    }
})
const customPagination = ({setPage, numOfPages=10}) =>{
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }
    return(
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10
            }}
        >
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    count={numOfPages}
                    onChange={(e) => handlePageChange(e.target.textContent)}
                    hideNextButton
                    hidePrevButton
                    color="primary"
                />
            </ThemeProvider>
            </div>
    )
}

export default customPagination;