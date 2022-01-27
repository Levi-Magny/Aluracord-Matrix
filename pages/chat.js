import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { React, useState } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagemAtual, setMensagemAtual] = useState('');
    const [listaDeMensagens, setListaDeMensagens] = useState([]);
    
    // ./Sua lógica vai aqui

    function handleDeleteMessage(id){
        setListaDeMensagens((old) => {
            return old.filter(item => item.id !== id);
        });
    }

    function handleNewMessage() {
        const username = 'Levi-Magny'
        const novaMensagem = {
            id: listaDeMensagens.length + 1,
            from: username,
            text: mensagemAtual
        }
        setListaDeMensagens([novaMensagem, ...listaDeMensagens]);
        setMensagemAtual('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[100],
                backgroundImage: `url(https://www.nawpic.com/media/2020/spider-man-into-the-spider-verse-nawpic-11-scaled.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '2em 5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} onDelete={handleDeleteMessage}/>
                    {/* <MessageList/> */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleNewMessage();
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            value={mensagemAtual}
                            onChange={(event) => {
                                setMensagemAtual(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                if(event.key === "Enter"){
                                    event.preventDefault();
                                    handleNewMessage();
                                }
                            }}
                            styleSheet={{
                                width: '100%',
                                height: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '10px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '5px',
                                color: appConfig.theme.colors.neutrals[100],
                            }}
                        />
                        <button
                            type='submit'
                        >
                            <img src='/send.png' width='inherit'/>
                        </button>
                        <style jsx>{`
                            button {
                                width: 5%;
                                min-width: 42px;
                                height: 50px;
                                background: none;
                                border: none;
                                border-radius: 10px;
                                padding: 5px;
                                transition: .5s;
                            }
                            button:hover {
                                cursor: pointer;
                                background: ${appConfig.theme.colors.neutrals[800]};
                            }
                            img {
                                height: 25px;
                            }
                        `}</style>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
            <Box
                tag="ul"
                styleSheet={{
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    flex: 1,
                    color: appConfig.theme.colors.neutrals["000"],
                    marginBottom: '16px',
                }}
            >
                {props.mensagens.map((mensagem, index) => {
                    return(
                        <Text
                            key={index}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }}
                        >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    margin: '0 8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <button
                                onClick={() => {
                                    return props.onDelete(mensagem.id);
                                }}
                            ><img src='/delete.png' width={10}/></button>
                            <style jsx>{`
                                button {
                                    background: none;
                                    border: none;
                                    border-radius: 2px;
                                }
                                button:hover {
                                    background-color: ${appConfig.theme.colors.neutrals[900]};
                                    cursor: pointer;
                                }
                            `}</style>
                        </Box>
                    {mensagem.text}
                </Text>
                );
            })}
        </Box>
    )
}