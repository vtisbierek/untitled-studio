import styles from "../styles/Row.module.scss";

type Portfolio = {
    postId: string;
    thumbnail: string;
    description: string;
    descriptionKR: string;
    category: string;
    tags: string[],
    images: string[];
}

interface RowProps{
    pictures: Portfolio[];
    modal: (modalState: boolean) => void;
    postId: (buttonId: string) => void;
}

export default function Row({pictures, modal, postId}: RowProps){

    function handleClick(buttonId: string){
        modal(true);
        postId(buttonId);
    }

    return (
        <div className={styles.container}>
            {pictures.map(picture => (
                <button onClick={() => handleClick(picture.postId)} className={styles.modalButton} key={picture.postId}>
                    <div className={styles.pictureBox}>
                        <img src={picture.thumbnail} alt={picture.description}/>
                        <div className={styles.pictureText}>
                            <div className={styles.pictureCaption}>
                                <h1 className={styles.title}>{picture.description}</h1>
                                <p className={styles.subTitle}>{picture.descriptionKR}</p>
                            </div>
                            <p className={styles.tags}>{picture.tags.map(tag => `${tag} `)}</p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}