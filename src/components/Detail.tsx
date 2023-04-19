import styles from "../styles/Detail.module.scss";

type Picture = {
    postId: string;
    thumbnail: string;
    description: string;
    descriptionKR: string;
    category: string;
    tags: string[],
    images: string[];
}

interface DetailProps{
    pictures: Picture;
}

export default function Detail({pictures}: DetailProps){

    return (
        <div className={styles.container}>
            {pictures.images.filter(item => item != null).map(picture => (
                <img src={picture} alt="portfolio picture"/>
            ))}
        </div>
    );
}