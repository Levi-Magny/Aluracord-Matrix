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
export default Titulo;