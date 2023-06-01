import styles from "../styles/Header.module.scss";
import Link from "next/link";
import {GiHamburgerMenu} from "react-icons/gi";
import {CgClose} from "react-icons/cg";
import Image from "next/dist/client/image";
import insta from "../../public/images/insta_nav.png";
import behance from "../../public/images/be_nav.png";
import pinterest from "../../public/images/pint_nav.png";
import {useState, useEffect} from "react";

export default function Header(){
    const [isOpen, setIsOpen] = useState(false);
    const [menuClasses, setMenuClasses] = useState(`${styles.navbarMenu}`);

    useEffect(() => {
        if(isOpen){
            setMenuClasses(`${styles.navbarMenu} ${styles.active}`);
        } else{
            setMenuClasses(`${styles.navbarMenu}`);
        }
    }, [isOpen]);

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.navbarWide}>
                    <Link href="/" title="HOME" className={styles.left}>
                        HOME
                    </Link>
                    <Link href="/portfolio" as="/portfolio" title="PORTFOLIO" className={styles.right}>
                        PORTFOLIO
                    </Link>
                </div>
                <div className={styles.navbarTitle}>
                    <Link href="/" className={styles.title} title="Untitled Studio">
                        Untitled Studio
                    </Link>
                </div>
                <div className={styles.navbarWide}>
                    <Link href="/about" title="ABOUT" className={styles.left}>
                        ABOUT
                    </Link>
                    <Link href="/contact" title="CONTACT US" className={styles.right}>
                        CONTACT US
                    </Link>
                </div>
                <div className={styles.navbarIcon}>
                    <button className={styles.hamburguer} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <CgClose />
                        ) : (
                            <GiHamburgerMenu />
                        )}
                    </button>
                </div>
                <div className={menuClasses}>
                    <hr />
                    <ul>
                        <li>
                            <Link href="/" title="HOME">
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link href="/portfolio" title="PORTFOLIO">
                                PORTFOLIO
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" title="ABOUT">
                                ABOUT
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" title="CONTACT US">
                                CONTACT US
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <div className={styles.navbarSocials}>
                        <a href="https://www.instagram.com/untitled.studio.official/" target="_blank">
                            <Image src={insta} alt="instagram icon" />
                        </a>
                        <a href="https://www.behance.net/untitled__studio" target="_blank">
                            <Image src={behance} alt="behance icon" />
                        </a>
                        <a href="https://www.pinterest.co.kr/untitledstudioofficial/" target="_blank">
                            <Image src={pinterest} alt="pinterest icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}