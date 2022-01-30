import React, { useContext, useEffect, useState } from "react";
import { Image, Box, Text } from "@skynexui/components";
import appConfig from '../../config.json';
import { MessageContext } from "../../contexts/mensagecontext";

export function ModalInfo({username}) {
    const {showModal, setShowModal} = useContext(MessageContext);
    const [dados, setDados] = useState({})
    useEffect(() => {
        if(showModal){
            fetch(`https://api.github.com/users/${username}`)
                .then((dados) => {
                    return dados.json();
                })
                .then((Data) => {
                    setDados(Data);
                })
        }
    }, [])
    return(
        <>
            <div className="back"></div>
            <Box
                styleSheet={{
                    display: (showModal ? 'flex' : 'none'),
                    position: 'absolute',
                    left: '40%',
                    top: '20%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '200px',
                    padding: '16px',
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.primary[400],
                    borderRadius: '2em 10px',
                    flex: 1,
                    minHeight: '240px',
                }}
            >
                <span className="close" onClick={() => {setShowModal(false)}}>X</span>
                <Image
                    styleSheet={{
                        borderRadius: '50%',
                        marginBottom: '16px',
                        backgroundColor: appConfig.theme.colors.neutrals[999],
                        border: '2px solid',
                        borderColor: appConfig.theme.colors.primary[400]
                    }}
                    src={`https://github.com/${username}.png`}
                    onError={() => {
                        console.log("Achei imagem não...")
                    }}
                />
                <Text
                    variant="body4" 
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals[100],
                        backgroundColor: appConfig.theme.colors.neutrals[999],
                        padding: '3px 10px',
                        borderRadius: '1000px'
                    }}
                >   
                    <a href={dados.html_url} target="_blank" style={{color: '#B2B9E6'}}>{username}</a>
                </Text>
                <p style={{marginTop: '10px', fontSize: '10pt'}}>Biografia:</p>
                <div className="bio">
                    <p>   
                        {dados.bio}
                    </p>
                </div>
            </Box>
            <style>{`
                .bio {
                    marginTop: 5px;
                    padding: 10px !important;
                    color: ${appConfig.theme.colors.neutrals[100]};
                    background-color: ${appConfig.theme.colors.neutrals[999]};
                    border-radius: 15px 5px;
                    margin-top: 5px;
                }
                .bio p {
                    font-size: 9pt;
                }
                .back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: #222222;
                    opacity: 0.4;
                }
                .close {
                    font-size: 8pt;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${appConfig.theme.colors.neutrals[100]};
                    background-color: ${appConfig.theme.colors.neutrals[999]};
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    position: absolute;
                    right: 10px;
                }
            `}</style>
        </>
    );
}