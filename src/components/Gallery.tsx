import Row from "./Row";
import { StaticImageData } from "next/image";
import usLogo from "../../public/images/us-logo.jpg";

type Picture = {
    url: StaticImageData;
    alt: string;
    descriptionEng: string;
    descriptionKor: string;
    tags: string[];
}

interface GalleryProps{
    pictures: Picture[];
    modal: (modalState: boolean) => void;
}

export default function Gallery({pictures, modal}: GalleryProps){
    const rowSize = 3;
    const remainder = pictures.length % rowSize;
    const year = new Date().getFullYear();

    function sendModal(modalState: boolean){
        modal(modalState);
    }

    if(remainder){
        console.log("remainder: " + remainder);
        
        const placeHolder = {
            url: usLogo,
            alt: "untitled studio logo",
            descriptionEng: "Untitled Studio",
            descriptionKor: "언타이틀 스튜디오",
            tags: [
                "Copyright © " + year
            ]
        }

        for(let i=0; i<(rowSize - remainder); i++){
            pictures = [...pictures, placeHolder];
        }
    }
    
    const rowsOfPictures: Picture[][] = [];
    for (let i=0; i<pictures.length; i+=rowSize) {
        rowsOfPictures.push(pictures.slice(i,i+rowSize));
    }

    return (
        <div>
            {rowsOfPictures.map(row => (
                <Row pictures={row} modal={sendModal}/>
            ))}
        </div>
    );
}