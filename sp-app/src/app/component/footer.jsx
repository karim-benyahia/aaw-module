import React from "react";
import "./footer.scss";

const footer = ({author, curse})=>{


    return (
        <footer >
            <div><a href="https://github.com/karim-benyahia/aaw-module" target="_blank">{author} - {curse}</a></div>
            <div>
                <img src="/img/logo-serli.png"/>
            </div>
        </footer>
    )
}

export default footer;
