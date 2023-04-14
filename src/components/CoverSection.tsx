import styles from "../styles/CoverSection.module.scss";
import Image from "next/image";
import coverImg from "../../public/images/Rectangle 8.png";
import modelImg from "../../public/images/Dimitri-Black-Catalogue-18_03_23-322 1.png";
import Carousel from '@/components/Carousel';

export default function CoverSection(){
    return (
        <div className={styles.container}>
            <section className={styles.coverSection}>
                <div className={styles.coverPanel1}>
                    <Image src={coverImg} alt="cover image"/>
                    <div className={styles.coverText}>
                        <h1>
                            NEXTO -
                        </h1>
                        <h1>
                            Information card
                        </h1>
                        <p>
                            넥스토 제품 안내카드 디자인 & 인쇄
                        </p>
                    </div>
                </div>
                <div className={styles.coverPanel2}>
                    <Image src={modelImg} alt="model image"/>
                    <div className={styles.coverText}>
                        <h1>
                            DIMITRI -
                        </h1>
                        <h1>
                            Model retouching
                        </h1>
                        <p>
                            S / S 시즌 상품 리터칭 & 업데이트
                        </p>
                    </div>
                </div>
                <div className={styles.carousel}>
                    <Carousel />   
                </div>
            </section>
        </div>
    );
}