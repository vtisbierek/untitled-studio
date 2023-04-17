import Head from 'next/head'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/Header';
import Link from 'next/link';
import CoverSection from '@/components/CoverSection';
import Gallery from '@/components/Gallery';
import { pictures } from '../../pictures';

export default function Home() {
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
              UX & UI <span className={styles.titleKr}>웹 UI & UX</span>
            </Link>
          </div>
        </section>
        <CoverSection />
        <section className={styles.portfolioSection}>
          <div className={styles.portfolioTitle}>
            <Link href="/portfolio">
              <h1>PORTFOLIO</h1>
              <p>포트폴리오</p>
            </Link>
          </div>
          <Gallery pictures={pictures}/>
        </section>
        
      </main>
    </>
  )
}
