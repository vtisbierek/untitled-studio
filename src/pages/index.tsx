import Head from 'next/head'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/Header';
import Link from 'next/link';
import CoverSection from '@/components/CoverSection';
import Gallery from '@/components/Gallery';
import EmailPanel from '@/components/EmailPanel';
import Footer from '@/components/Footer';
import Modal, {RenderModalBackdropProps} from "react-overlays/Modal";
import {useState, useEffect} from "react";
import Detail from '@/components/Detail';
import { GetStaticProps } from 'next';
import {client} from "../services/prismic";
import * as prismicH from '@prismicio/helpers';
import {RiCloseFill} from "react-icons/ri";

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

type Portfolio = {
  postId: string;
  thumbnail: string;
  description: string;
  descriptionKR: string;
  category: string;
  tags: string[],
  images: string[]
}

type Generics = {
  thumbnail: string;
  image: string;
}

interface ContentProps{
  content: Content;
  portfolio: Portfolio[];
  page: number; 
  totalPages: number;
  generics: Generics;
}

export function fixGallerySize(pictures: Portfolio[], genericProps: Generics, rowSize: number){
  const remainder = pictures.length % rowSize;
  const year = new Date().getFullYear();

  if(remainder){     
    const placeHolder = {
        postId: "0",
        thumbnail: genericProps.thumbnail,
        description: "Untitled Studio",
        descriptionKR: "언타이틀 스튜디오",
        category: "none",
        tags: [
            "Copyright © " + year
        ],
        images: [
          genericProps.image,
        ]
    }
    const placeHolder2 = {...placeHolder};
    placeHolder2.postId = "1";

    for(let i=0; i<(rowSize - remainder); i++){
        if (i){
            pictures = [...pictures, placeHolder2];
        } else{
            pictures = [...pictures, placeHolder];                
        }      
    }
  }
  return pictures;
}

export default function Home({content, portfolio, page, totalPages, generics}: ContentProps) {
  const [showModal, setShowModal] = useState(false);
  const [detailId, setDetailId] = useState("");
  const [currentPage, setCurrentPage] = useState(page);
  const [galleryView, setGalleryView] = useState(portfolio);
  const [gallerySize, setGallerySize] = useState({row: 3, page: 9});
  const [layout, setLayout] = useState("desktop");

  useEffect(() => {
    function handleRowSize() {
      const screenWidth = window.innerWidth;
      const layoutType = screenWidth > 728 ? "desktop" : "mobile";

      if(layoutType !== layout){
        setLayout(layoutType);
      }
    }
    window.addEventListener('resize', handleRowSize);
    handleRowSize();
    
    //removendo o event listener quando o componente window for desmontado pra evitar memory leaks
    return () => {
        window.removeEventListener('resize', handleRowSize);
    }
  }, [layout]);

  useEffect(() => {
    async function handleLayout(){
      if(layout === "desktop"){
        setGallerySize({row: 3, page: 9});
        await getPortfolioByPage(1, 9, true);
      } else {      
        setGallerySize({row: 2, page: 8});
        await getPortfolioByPage(1, 8, true);
      }
    }
    handleLayout();

  }, [layout]);
  
  function getModal(modalState: boolean){
    setShowModal(modalState);
  }

  function getPostId(buttonId: string){
    setDetailId(buttonId);
  } 

  async function getPortfolioByPage(pageNumber: number, pageSize: number, reset: boolean){
    const response = await client.getByType("portfolio", {
        orderings: {
            field: 'document.last_publication_date',
            direction: 'desc',
        },
        pageSize: pageSize,
        page: pageNumber,
    });

    let addedPortfolio: Portfolio[] = response.results.map(item => {
      return {
          postId: item.id,
          thumbnail: prismicH.asImageSrc(item.data.thumbnail)!,
          description: item.data.description,
          descriptionKR: item.data.descriptionkr,
          category: item.data.category,
          tags: [
            item.data.tag1,
            item.data.tag2,
            item.data.tag3
          ],
          images: [
            prismicH.asImageSrc(item.data.detailimg1)!,
            prismicH.asImageSrc(item.data.detailimg2)!,
            prismicH.asImageSrc(item.data.detailimg3)!,
            prismicH.asImageSrc(item.data.detailimg4)!,
            prismicH.asImageSrc(item.data.detailimg5)!,
            prismicH.asImageSrc(item.data.detailimg6)!,
            prismicH.asImageSrc(item.data.detailimg7)!,
            prismicH.asImageSrc(item.data.detailimg8)!,
            prismicH.asImageSrc(item.data.detailimg9)!,
          ]
      }
    });

    if(!reset) {
      addedPortfolio = galleryView.concat(addedPortfolio);
    }
    
    setGalleryView(addedPortfolio);
    setCurrentPage(pageNumber);
  }

  const gallery = fixGallerySize(galleryView, generics, gallerySize.row);
  const renderBackdrop = (props: RenderModalBackdropProps) => <div className={styles.backdrop} {...props} />;

  return (
    <>
      <Head>
        <title>Untitled Studio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Modal
          className={styles.modal}
          show={showModal}
          onHide={() => setShowModal(false)}
          renderBackdrop={renderBackdrop}
        >
          <div className={styles.modalDiv}>
            <div className={styles.detailDiv}>
              <Detail pictures={gallery.find(item => item.postId === detailId)!}/>
            </div>
            <button onClick={() => setShowModal(false)} className={styles.buttonClose}>
              <RiCloseFill />
            </button>
          </div>
        </Modal>
        <Header />
        <section className={styles.titleSection}>
          <div className={styles.titleLine}>
            <Link href="/portfolio?category=card" as="/portfolio">
              Business card <span className={styles.titleKr}>명함</span>
            </Link>
            <span>/</span>
            <Link href="/portfolio?category=logo" as="/portfolio">
              Logo <span className={styles.titleKr}>로고</span>
            </Link>
            <span>/</span>
            <Link href="/portfolio?category=retouching" as="/portfolio">
              Retouching <span className={styles.titleKr}>리터칭</span>
            </Link>
          </div>
          <div className={styles.titleLine}>
            <Link href="/portfolio?category=printing" as="/portfolio">
              Printing <span className={styles.titleKr}>인쇄물</span>
            </Link>
            <span>/</span>
            <Link href="/portfolio?category=web" as="/portfolio">
              Web contents <span className={styles.titleKr}>웹컨텐츠</span>
            </Link>
            <span>/</span>
            <Link href="/portfolio?category=uiux" as="/portfolio">
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
          <Gallery pictures={gallery} modal={getModal} postId={getPostId} size={gallerySize.row}/>
          {currentPage < totalPages && (
            <div className={styles.seeMore}>
              <button onClick={() => getPortfolioByPage(currentPage+1, gallerySize.page, false)}>
                <h1>VIEW MORE</h1>
                <p>더보기</p>
              </button>
            </div>
          )}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const responseHome = await client.getSingle("home");
  console.log(context);
  

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
  } = responseHome.data;

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

  const responsePortfolio = await client.getByType("portfolio", {
    orderings: {
        field: 'document.last_publication_date',
        direction: 'desc',
    },
    pageSize: 9,
  });

  const portfolio = responsePortfolio.results.map(item => {
    return {
        postId: item.id,
        thumbnail: prismicH.asImageSrc(item.data.thumbnail),
        description: item.data.description,
        descriptionKR: item.data.descriptionkr,
        category: item.data.category,
        tags: [
          item.data.tag1,
          item.data.tag2,
          item.data.tag3
        ],
        images: [
          prismicH.asImageSrc(item.data.detailimg1),
          prismicH.asImageSrc(item.data.detailimg2),
          prismicH.asImageSrc(item.data.detailimg3),
          prismicH.asImageSrc(item.data.detailimg4),
          prismicH.asImageSrc(item.data.detailimg5),
          prismicH.asImageSrc(item.data.detailimg6),
          prismicH.asImageSrc(item.data.detailimg7),
          prismicH.asImageSrc(item.data.detailimg8),
          prismicH.asImageSrc(item.data.detailimg9),
        ]
    }
  });

  const responseGenerics = await client.getSingle("generics");

  const generics = {
    thumbnail: prismicH.asImageSrc(responseGenerics.data.thumbnail),
    image: prismicH.asImageSrc(responseGenerics.data.image),
  }
  
  return {
    props: {
      content,
      portfolio,
      page: responsePortfolio.page,
      totalPages: responsePortfolio.total_pages,
      generics,
    },
    revalidate: 60 * 10, //essa página será gerada novamente a cada 10 minutos
  }
}
