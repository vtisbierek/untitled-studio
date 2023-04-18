import styles from "../styles/Detail.module.scss";
import Image, {StaticImageData} from "next/image";

type Picture = {
    url: StaticImageData;
    alt: string;
}

interface DetailProps{
    pictures: Picture[];
}

export default function Detail({pictures}: DetailProps){
    return (
        <div className={styles.container}>
            {pictures.map(picture => (
                <Image src={picture.url} alt={picture.alt}/>
            ))}
        </div>
    );
}