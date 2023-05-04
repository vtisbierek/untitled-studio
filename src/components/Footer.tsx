import styles from "../styles/Footer.module.scss";
import Image from "next/image";
import instaIcon from "../../public/images/insta_nav.png";
import behanceIcon from "../../public/images/be_nav.png";
import pintIcon from "../../public/images/pint_nav.png";

export default function Footer(){
    const year = new Date().getFullYear();

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.sns}>
                        <h1>Social Media</h1>
                        <ul>
                            <li><a href="https://www.instagram.com/untitled.studio.official/" target="_blank">- INSTAGRAM</a></li>
                            <li><a href="https://www.behance.net/untitled__studio" target="_blank">- BEHANCE</a></li>
                            <li><a href="https://www.pinterest.co.kr/untitledstudioofficial/" target="_blank">- PINTEREST</a></li>
                            <li><a href="http://pf.kakao.com/_Zgmxixj/chat" target="_blank">- KAKAO CHANNEL</a></li>
                            <li><a href="https://wa.me/5551996832084" target="_blank">- WHATSAPP</a></li>
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
            <div className={styles.footerSocials}>
                <a className={styles.instaIcon} href="https://www.instagram.com/untitled.studio.official/" target="_blank">
                    <Image src={instaIcon} alt="instagram icon" />
                </a>
                <a className={styles.behanceIcon} href="https://www.behance.net/untitled__studio" target="_blank">
                    <Image src={behanceIcon} alt="behance icon" />
                </a>
                <a className={styles.pintIcon} href="https://www.pinterest.co.kr/untitledstudioofficial/" target="_blank">
                    <Image src={pintIcon} alt="pinterest icon" />
                </a>
            </div>
            <div className={styles.copyright}>
                <p>Copyright © {year} <span>Untitled Studio</span> All Rights Reserved.</p>
            </div>
        </div>
    );
}