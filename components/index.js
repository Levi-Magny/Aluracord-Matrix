import React from "react";
import appConfig from '../config.json';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    const Color = props.color || "000";
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals[Color]};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}
function Spidey(){
    return (
        <>
            <img src="/spiderman.png" width={300} height={300}/>
            <style jsx>{`
                img {
                    position: fixed;
                    top: 0;
                    left: 5%;
                    -webkit-animation: animationFrames ease-in-out 6s;
                    -webkit-animation-iteration-count:infinite;
                    -webkit-transform-origin: 50% 0%;
                }

                @-webkit-keyframes animationFrames {
                    0% {-webkit-transform:rotate(10deg);}
                    50% {-webkit-transform:rotate(-10deg);}
                    100% {-webkit-transform:rotate(10deg);}
                }
            `}</style>
        </>
    );
}
export { Titulo, Spidey };