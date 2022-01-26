import { Box, Image, Text } from "@skynexui/components";
import appConfig from '../config.json';
import {Titulo} from "../components";
// import spiderHam from '../assets/Spiedr_ham.png';

export default function PageNotFound() {
    return(
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:"column",
                    backgroundColor: appConfig.theme.colors.neutrals[100],
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply'
                }}
            >
                <Image
                    src="https://popcultureuk.com/image/cache/catalog/data/2019/others/HOTCOSB639-500x500.png"
                />
                <Titulo tag="h1" color="800">404... Universo Errado!</Titulo>
            </Box>
        </>
    );
}