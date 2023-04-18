import styles from "../styles/Footer.module.scss";

export default function Footer(){
    const year = new Date().getFullYear();

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.sns}>
                        <h1>Social Media</h1>
                        <ul>
                            <li><a href="https://www.instagram.com/untitled.studio.official/">- INSTAGRAM</a></li>
                            <li><a href="https://www.behance.net/untitled__studio">- BEHANCE</a></li>
                            <li><a href="https://www.pinterest.co.kr/untitledstudioofficial/">- PINTEREST</a></li>
                            <li><a href="">- KAKAO CHANNEL</a></li>
                            <li><a href="">- WHATSAPP</a></li>
                        </ul>
                    </div>
                    <div className={styles.aboutUs}>
                        <h1>About us</h1>
                        <p><strong>E-mail. </strong>untitled.studio.official@gmail.com</p>
                        <p><strong>Tel. </strong>070 8018 6440</p>
                        <p><strong>Business no. </strong>268 - 63 - 00300</p>
                    </div>
                    <div className={styles.address}>
                        <h1>Address</h1>
                        <p>03387 | 서울특별시 은평구 대조동 221-1 501호</p>
                        <p>501ho, 16, Yeonseo-ro 22-gil, Eunpyeong-gu, Seoul호</p>
                        <p>Republic of Korea (03387)</p>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>Copyright © {year} <span>Untitled Studio</span> All Rights Reserved.</p>
            </div>
        </div>
    );
}