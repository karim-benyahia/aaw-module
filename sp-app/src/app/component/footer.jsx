import React from "react";
import "./footer.scss";

const footer = ({author, curse})=>{


    return (
        <footer >
            <div>{author} - {curse}</div>
            <div>
                <img src="/img/logo-serli.png"/>
            </div>
        </footer>
    )
}

export default footer;
