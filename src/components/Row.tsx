import Image, { StaticImageData } from "next/image";
import styles from "../styles/Row.module.scss";

type Picture = {
    url: StaticImageData;
    alt: string;
    descriptionEng: string;
    descriptionKor: string;
    tags: string[];
}

interface RowProps{
    pictures: Picture[];
}

export default function Row({pictures}: RowProps){
    return (
        <div className={styles.container}>
            {pictures.map(picture => (
                <div className={styles.pictureBox}>
                    <Image src={picture.url} alt={picture.alt}/>
                    <div className={styles.pictureText}>
                        <div className={styles.pictureCaption}>
                            <h1 className={styles.title}>{picture.descriptionEng}</h1>
                            <p className={styles.subTitle}>{picture.descriptionKor}</p>
                        </div>
                        <p className={styles.tags}>{picture.tags.map(tag => `${tag} `)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}