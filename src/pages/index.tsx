import Head from 'next/head'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/Header';
import Link from 'next/link';
import CoverSection from '@/components/CoverSection';
import Gallery from '@/components/Gallery';
import EmailPanel from '@/components/EmailPanel';
import Footer from '@/components/Footer';
import Modal, {RenderModalBackdropProps} from "react-overlays/Modal";
import {useState} from "react";
import Detail from '@/components/Detail';
import { GetStaticProps } from 'next';
import {client} from "../services/prismic";
import * as prismicH from '@prismicio/helpers';
import { pictures, details } from '../../pictures'; //vai sair depois, pois as imagens vão vir do CMS

type Content = {
  coverSection: {
    left: {
      image: string;
      title: string;
      description: string;
      descriptionKR: string;
    },
    right: {
      image: string;
      title: string;
      description: string;
      descriptionKR: string;
    }
  },
  carousel: {
    image: string;
    title: string;
    description: string;
    descriptionKR: string;
  }[],
  ourClientsImg: string;
}

interface ContentProps{
  content: Content;
}

export default function Home({content}: ContentProps) {
  const [showModal, setShowModal] = useState(false);

  function getModal(modalState: boolean){
    setShowModal(modalState);
  }

  const renderBackdrop = (props: RenderModalBackdropProps) => <div className={styles.backdrop} {...props} />;

  return (
    <>
      <Head>
        <title>Untitled Studio</title>
      </Head>
      <main className={styles.main}>
        <Modal
          className={styles.modal}
          show={showModal}
          onHide={() => setShowModal(false)}
          renderBackdrop={renderBackdrop}
        >
          <Detail pictures={details}/>
        </Modal>
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
        <CoverSection sectionData={content}/>
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
            <img src={content.ourClientsImg} alt="clients logos" />
          </div>
        </section>
        <section>
          <EmailPanel />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.getSingle("home");

  const {
    coverimgleft,
    covertitleleft,
    coverdescriptionleft,
    coverdescriptionkrleft,
    coverimgright,
    covertitleright,
    coverdescriptionright,
    coverdescriptionkrright,
    carouselimg1,
    carouseltitle1,
    carouseldescription1,
    carouseldescriptionkr1,
    carouselimg2,
    carouseltitle2,
    carouseldescription2,
    carouseldescriptionkr2,
    carouselimg3,
    carouseltitle3,
    carouseldescription3,
    carouseldescriptionkr3,
    carouselimg4,
    carouseltitle4,
    carouseldescription4,
    carouseldescriptionkr4,
    ourclientsimg
  } = response.data;
  
  const content = {
    coverSection: {
      left: {
        image: prismicH.asImageSrc(coverimgleft),
        title: covertitleleft,
        description: coverdescriptionleft,
        descriptionKR: coverdescriptionkrleft
      },
      right:{
        image: prismicH.asImageSrc(coverimgright),
        title: covertitleright,
        description: coverdescriptionright,
        descriptionKR: coverdescriptionkrright
      }
    },
    carousel: [
      {
        image: prismicH.asImageSrc(carouselimg1),
        title: carouseltitle1,
        description: carouseldescription1,
        descriptionKR: carouseldescriptionkr1
      }, {
        image: prismicH.asImageSrc(carouselimg2),
        title: carouseltitle2,
        description: carouseldescription2,
        descriptionKR: carouseldescriptionkr2
      }, {
        image: prismicH.asImageSrc(carouselimg3),
        title: carouseltitle3,
        description: carouseldescription3,
        descriptionKR: carouseldescriptionkr3
      }, {
        image: prismicH.asImageSrc(carouselimg4),
        title: carouseltitle4,
        description: carouseldescription4,
        descriptionKR: carouseldescriptionkr4
      }
    ],
    ourClientsImg: prismicH.asImageSrc(ourclientsimg)
  }

  console.log(content);
  
   
  return {
    props: {
      content
    },
    revalidate: 60 * 10, //essa página será gerada novamente a cada 10 minutos
  }
}
