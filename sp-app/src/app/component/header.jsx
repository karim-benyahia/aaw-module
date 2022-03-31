import React from "react";
import "./header.scss";

const header = ({title})=>{
    return (
        <header>
            <div>
                <a href="index">
                    <img src="/img/webapp.png" className="icon"/>
                    <span>{title}</span>
                </a>
            </div>
        </header>
    )
}

export default header;
