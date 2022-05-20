import React from "react";
import "./header.scss";

const header = ({title, callShowAside})=>{
    return (
        <header>
            <div>
                <a onClick={callShowAside}>
                    <img src="/img/webapp.png" className="icon"/>
                    <span>{title}</span>
                </a>
            </div>
        </header>
    )
}

export default header;
