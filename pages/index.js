import {Titulo, Spidey} from '../components/index.js'
import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { React, useState } from 'react';
import { useRouter } from 'next/router';

export default function PaginaInicial() {
    const [username, setUsername] = useState('');
    const [errorImg, setErrorImg] = useState(true);
    const rotas = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals[100],
                    backgroundImage: 'url(https://www.nawpic.com/media/2020/spider-man-into-the-spider-verse-nawpic-11-scaled.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Spidey/>
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '2.5em 5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        opacity: 0.95
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            rotas.push('/chat');
                        }}
                    >   
                        <Titulo tag="h2">Sabe o que é mais legal que magia? Matemática!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[100] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals['200'],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                if(errorImg){
                                    setErrorImg(false);
                                }
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            disabled={errorImg}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals["200"],
                            borderRadius: '2em 10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={errorImg ? `https://www.teahub.io/photos/full/206-2068156_spider-man-circle-logo-spiderman-logo-clipart.jpg` : `https://github.com/${username}.png`}
                            onError={() => {
                                if(!errorImg)
                                    setErrorImg(true)
                            }}
                        />
                        <Text
                            variant="body4" 
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[100],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >   
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}