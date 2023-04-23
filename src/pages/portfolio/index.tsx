import styles from "../../styles/Portfolio.module.scss";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Headline from "@/components/Headline";
import Category from "@/components/Category";
import {useRouter} from "next/router";
import { useState, useEffect } from "react";
import { GetStaticProps } from 'next';
import {client} from "../../services/prismic";
import * as prismicH from '@prismicio/helpers';
import * as prismic from '@prismicio/client';
import {fixGallerySize} from "../index";
import Modal, {RenderModalBackdropProps} from "react-overlays/Modal";
import {RiCloseFill} from "react-icons/ri";
import Detail from "@/components/Detail";

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
  
interface PortfolioProps{
  portfolio: Portfolio[];
  generics: Generics;
}

async function getPortfolioByCategory(category: string){
  const response = await client.getByType("portfolio", {
    predicates: [
      prismic.predicate.at("my.portfolio.category", category)
    ],
    orderings: {
        field: 'document.last_publication_date',
        direction: 'desc',
    },
    pageSize: 9,
  });

  const portfolio: Portfolio[] = response.results.map(item => {
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

  return portfolio;
}

async function getPortfolio(){
  const response = await client.getByType("portfolio", {
    orderings: {
        field: 'document.last_publication_date',
        direction: 'desc',
    },
    pageSize: 9,
  });

  const portfolio: Portfolio[] = response.results.map(item => {
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

  return portfolio;
}

export default function Portfolio({portfolio, generics}: PortfolioProps){
  const [menuCategory, setMenuCategory] = useState("all");
  const [galleryView, setGalleryView] = useState(portfolio);
  const [galleryReady, setGalleryReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detailId, setDetailId] = useState("");
 
  const router = useRouter();
  const {category} = router.query;  

  useEffect(() => {
    if(category){
        setMenuCategory(category as string);
        
        const connectPrismic = async () => {
          const portfolioByCategory = await getPortfolioByCategory(category as string);
          setGalleryView(portfolioByCategory);
          setGalleryReady(true);
        };
        connectPrismic();
    }
  }, []);  

  console.log("hihi");
  
  console.log(galleryView);
  
  function getModal(modalState: boolean){
    setShowModal(modalState);
  }

  function getPostId(buttonId: string){
    setDetailId(buttonId);
  } 
  
  function handleCategory(category: string){
    setMenuCategory(category);
  }
  
  const gallery = fixGallerySize(galleryView as Portfolio[], generics);
  const renderBackdrop = (props: RenderModalBackdropProps) => <div className={styles.backdrop} {...props} />;

  return (
    <div className={styles.container}>
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
        <Headline currentMenu={menuCategory} selectedMenu={handleCategory}/>
        {menuCategory !== "all" && (
          <Category category={menuCategory}/>
        )}
        {galleryReady && (
          <Gallery pictures={gallery} modal={getModal} postId={getPostId}/>
        )}
        <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.getByType("portfolio", {
    orderings: {
        field: 'document.last_publication_date',
        direction: 'desc',
    },
    pageSize: 9,
  });

  const portfolio: Portfolio[] = response.results.map(item => {
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

  const responseGenerics = await client.getSingle("generics");
  
  const generics = {
    thumbnail: prismicH.asImageSrc(responseGenerics.data.thumbnail),
    image: prismicH.asImageSrc(responseGenerics.data.image),
  }
  
  return {
    props: {
      portfolio,
      generics,
    },
    revalidate: 60 * 10, //essa página será gerada novamente a cada 10 minutos
  }
}