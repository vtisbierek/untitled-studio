import Row from "./Row";
import usLogo from "../../public/images/us-logo.jpg";

type Portfolio = {
    postId: string;
    thumbnail: string;
    description: string;
    descriptionKR: string;
    category: string;
    tags: string[],
    images: string[];
}

interface GalleryProps{
    pictures: Portfolio[];
    modal: (modalState: boolean) => void;
    postId: (buttonId: string) => void;
}

export default function Gallery({pictures, modal, postId}: GalleryProps){
    
    function sendModal(modalState: boolean){
        modal(modalState);
    }

    function sendPostId(buttonId: string){
        postId(buttonId);
    }

    const rowsOfPictures: Portfolio[][] = [];
    const rowSize = 3;
    for (let i=0; i<pictures.length; i+=rowSize) {
        rowsOfPictures.push(pictures.slice(i,i+rowSize));
    }

    return (
        <div>
            {rowsOfPictures.map((row, index) => (
                <Row pictures={row} modal={sendModal} postId={sendPostId} key={index}/>
            ))}
        </div>
    );
}