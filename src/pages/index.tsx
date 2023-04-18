import Head from 'next/head'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/Header';
import Link from 'next/link';
import CoverSection from '@/components/CoverSection';
import Gallery from '@/components/Gallery';
import Image from 'next/image';
import EmailPanel from '@/components/EmailPanel';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import {useState} from "react";
import { pictures } from '../../pictures'; //vai sair depois, pois as imagens vão vir do CMS
import clients from "../../public/images/Group 89.png"; //também vai sair, pois vai vir do CMS

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  function getModal(modalState: boolean){
    setShowModal(modalState);
  }

  console.log(showModal);
  

  return (
    <>
      <Head>
        <title>Untitled Studio</title>
      </Head>
      <main className={styles.main}>
        <Header />
        <section className={styles.titleSection}>
          <div>
            <Link href="/portfolio">
              Business card <span className={styles.titleKr}>명함</span>
            </Link>
            <span>/</span>
            <Link href="/portfolio">
              Logo <span className={styles.titleKr}>로고</span>
            </Link>
            <span>/</span>
            <Link href="/portfolio">
              Retouching <span className={styles.titleKr}>리터칭</span>
            </Link>
          </div>
          <div>
            <Link href="/portfolio">
              Printing <span className={styles.titleKr}>인쇄물</span>
            </Link>
            <span>/</span>
            <Link href="/portfolio">
              Web contents <span className={styles.titleKr}>웹컨텐츠</span>
            </Link>
            <span>/</span>
            <Link href="/portfolio">
              UI & UX <span className={styles.titleKr}>웹 UI & UX</span>
            </Link>
          </div>
        </section>
        <CoverSection />
        <section className={styles.portfolioSection}>
          <div className={styles.portfolioTitle}>
            <Link href="/portfolio">
              <h1>Portfolio</h1>
              <p>포트폴리오</p>
            </Link>
          </div>
          <Gallery pictures={pictures} modal={getModal}/>
          <div className={styles.seeMore}>
            <button>
              <h1>VIEW MORE</h1>
              <p>더보기</p>
            </button>
          </div>
        </section>
        <section className={styles.clientSection}>
          <div className={styles.clientTitle}>
            <div>
              <h1>Our Clients</h1>
              <p>우리의 고객사들</p>
            </div>
          </div>
          <div className={styles.clientBanner}>
            <Image src={clients} alt="clients logos" />
          </div>
        </section>
        <section>
          <EmailPanel />
        </section>
        <section>
          <Footer />
        </section>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          Lalalala
        </Modal>
      </main>
    </>
  )
}
