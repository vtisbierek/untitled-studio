import Header from "@/components/Header";
import styles from "../../styles/About.module.scss";
import Footer from "@/components/Footer";
import Link from 'next/link';
import Head from "next/head";

export default function About(){
    return (
        <>
            <Head>
                <title>Untitled Studio | About Us</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className={styles.container}>
                <Header />
                <section className={styles.title}>
                    <div className={styles.titleContent}>
                        <h1>ABOUT US <span>우리에 대해</span></h1>
                    </div>
                </section>
                <section className={styles.about}>
                    <div className={styles.aboutContent}>
                        <div className={styles.left}>
                            <img src="/images/about.png" alt="about us poster"/>
                        </div>
                        <div className={styles.right}>
                            <h1>언타이틀 스튜디오는 브랜드 디자인의 한 길만 걸어왔습니다.</h1>
                            <p>넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄.</p>
                            <p>넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄.</p>
                            <button>
                                <Link href="/contact">상담 문의</Link>
                            </button>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}