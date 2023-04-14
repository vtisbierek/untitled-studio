import styles from "../styles/Header.module.scss";
import Link from "next/link";

export default function Header(){
    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <div>
                    <Link href="/" title="HOME" className={styles.left}>
                        HOME
                    </Link>
                    <Link href="/about" title="ABOUT" className={styles.left}>
                        ABOUT
                    </Link>
                </div>
                <div>
                    <Link href="/" className={styles.title} title="Untitled Studio">
                        Untitled Studio
                    </Link>
                </div>
                <div>
                    <Link href="/portfolio" title="PORTFOLIO" className={styles.right}>
                        PORTFOLIO
                    </Link>
                    <Link href="/contact" title="CONTACT US" className={styles.right}>
                        CONTACT US
                    </Link>
                </div>
            </div>
        </div>
    );
}