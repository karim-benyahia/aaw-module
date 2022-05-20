import React, {useState} from "react";
import Aside from "../../component/aside";
import Header from "../../component/header";
import Footer from "../../component/footer";

const curse = () => {
    const [showAside, setShowAside] = useState(false);

    const callShowAside = () => {
        setShowAside(!showAside);
        console.log("showAside",showAside);
    }
    return (
        <div>
            <Aside accueil={true} showAside={showAside}/>
            <Header title="SinglePage Application" callShowAside={callShowAside}/>
        <main>
            <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vRPe--Ct_YXZV9-MRZEhD377T1e5XHDjbqR08c6jaLeXp5c9QLFFDyEddtNdjqx0Q/embed?start=false&loop=false&delayms=60000"
                frameBorder="0" width="100%" height="100%" allowFullScreen={true} mozallowfullscreen="true"
                webkitallowfullscreen="true"></iframe>
        </main>
            <Footer author="Karim Benyahia" curse="AAW"/>
        </div>
    )
};

export default curse;
