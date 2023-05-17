import Header from "@/components/Header";
import styles from "../../styles/About.module.scss";
import Footer from "@/components/Footer";
import Link from 'next/link';
import Head from "next/head";
import { GetStaticProps } from 'next';
import {client} from "../../services/prismic";
import * as prismicH from '@prismicio/helpers';

type Content = {
    image: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
};

interface AboutProps{
    content: Content;
}

export default function About({content}: AboutProps){
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
                            <img src={content.image} alt={content.title}/>
                        </div>
                        <div className={styles.right}>
                            <h1>{content.title}</h1>
                            <p>{content.paragraph1}</p>
                            <p>{content.paragraph2}</p>
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

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await client.getSingle("about");
    
    const {
      image,
      title,
      paragraph1,
      paragraph2,
    } = response.data;
  
    const content = {
        image: prismicH.asImageSrc(image),
        title: title,
        paragraph1: paragraph1,
        paragraph2: paragraph2
    }
    
    return {
      props: {
        content,
      },
      revalidate: 60 * 10, //essa página será gerada novamente a cada 10 minutos
    }
  }