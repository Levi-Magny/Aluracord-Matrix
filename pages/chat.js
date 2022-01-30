import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { React, useContext, useEffect, useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { MessageContext } from '../contexts/mensagecontext';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { ModalInfo } from '../src/components/ModalInfo';

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyODExMiwiZXhwIjoxOTU4OTA0MTEyfQ.S7HczkXGRu1q_ourBRz6TqzmcfPLbmcEYkkd2tELH6w"
const SUPABASE_URL = "https://zivmirrwsocgzrcsvzzs.supabase.co"
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagemEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive)=>{
            adicionaMensagem(respostaLive.new)
        })
        .subscribe();
}

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagemAtual, setMensagemAtual] = useState('');
    const [listaDeMensagens, setListaDeMensagens] = useState([]);
    const {username, setUsername} = useContext(MessageContext);
    
    useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false})
            .then(({ data }) => {
                setListaDeMensagens(data);
        });

        const subscription = escutaMensagemEmTempoReal((novaMensagem)=>{
            console.log('Nova mensagem:', novaMensagem);
            setListaDeMensagens((ListaAntiga)=>{
                return[
                    novaMensagem,
                    ...ListaAntiga
                ]
            });
        });
        return () => {subscription.unsubscribe();}
    }, [])

    // ./Sua lógica vai aqui

    function handleDeleteMessage(antigoId){
        supabaseClient
            .from('mensagens')
            .delete()
            .match({ id: Number(antigoId) })
            .then(({data, error}) => {
                console.log(error);
            })
        setListaDeMensagens((old) => {
            return old.filter(item => item.id !== antigoId);
        });
    }

    function handleNewMessage(mensagem=mensagemAtual) {
        const user = username;
        const novaMensagem = {
            de: user,
            texto: mensagem
        }
        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os mesmos campos definidos no Banco de Dados.
                novaMensagem
            ])
            .then(({data}) => {
                console.log('Criando mensagem: ', data);
            })
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
                <Header logout={()=>{
                    setUsername('');
                    setShowModal(false);
                }}/>
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

                    <MessageList mensagens={listaDeMensagens} onDelete={handleDeleteMessage} user={username}/>
                    {listaDeMensagens.length === 0 && <img src='/peni-parker.gif' width={'50%'} style={{
                        mixBlendMode: 'screen',
                        position: 'relative',
                        left: '25%',
                        bottom: '25%'
                    }}/>}

                    {/* <MessageList/> */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            if(mensagemAtual=='') return;
                            handleNewMessage();
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/${username}.png`}
                        />
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
                                    if(mensagemAtual=='') return;
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
                        <ButtonSendSticker onStickerClick={(link)=>{
                            // console.log(`:sticker: ${link}`);
                            handleNewMessage(`:sticker: ${link}`);
                        }}/>
                        <button
                            type='submit'
                            disabled={(mensagemAtual=='')}
                        >
                            <img src='/send.png' width='inherit'/>
                        </button>
                        <style jsx>{`
                            button {
                                min-width: 35px;
                                height: 35px;
                                background: ${appConfig.theme.colors.primary[900]};
                                border: none;
                                border-radius: 50%;
                                margin-bottom: 8px;
                                margin-left: 5px;
                                padding: 5px 0 0 0;
                                transition: .5s;
                            }
                            button:hover {
                                cursor: pointer;
                                background: ${appConfig.theme.colors.neutrals[800]};
                            }
                            img {
                                height: 18px;
                            }
                        `}</style>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header(props) {
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

                    onClick={props.logout}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const novaData = (data) => {
        const newDate = new Date(data);
        const dataAtual = new Date();
        const dia = (dataAtual.toLocaleDateString() === newDate.toLocaleDateString()) ? 'Hoje' : newDate.toLocaleDateString();
        return (`${dia} às ${newDate.toLocaleTimeString()}`)
    }
    const [nomeModal, setNomeModal] = useState('');
    const {showModal,setShowModal} = useContext(MessageContext);
    return (
        <>
            {showModal && <ModalInfo username={nomeModal}/>}
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
                className='caixa-mensagem'
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
                                    hover: {
                                        cursor: 'pointer'
                                    }
                                }}
                                onClick={()=>{
                                    setNomeModal(mensagem.de);
                                    setShowModal(true);
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
                                    src={`https://github.com/${mensagem.de}.png`}
                                />
                                <Text tag="strong">
                                    {mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        margin: '0 8px',
                                        color: appConfig.theme.colors.neutrals['050'],
                                    }}
                                    tag="span"
                                >
                                    {novaData(mensagem.created_at)}
                                </Text>
                                {((props.user).toLowerCase() == (mensagem.de).toLowerCase()) && <button
                                    onClick={() => {
                                        return props.onDelete(mensagem.id);
                                    }}
                                ><img src='/delete.png' width={10}/></button>}
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
                            {mensagem.texto.startsWith(':sticker:')
                                ?   <Image
                                        src={mensagem.texto.replace(':sticker:', '')}
                                        styleSheet={{
                                            height: '7em'
                                        }}
                                    />
                                :    mensagem.texto
                            }
                        </Text>
                    );
                })}
            </Box>
        </>
    )
}