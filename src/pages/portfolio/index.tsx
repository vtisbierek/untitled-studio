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
  page: number;
  totalPages: number;
  generics: Generics;
}

async function getPortfolioByCategory(category: string, page: number, pageSize: number){
  const response = await client.getByType("portfolio", {
    predicates: [
      prismic.predicate.at("my.portfolio.category", category)
    ],
    orderings: {
        field: 'document.last_publication_date',
        direction: 'desc',
    },
    pageSize: pageSize,
    page: page,
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

  const portfolioData = {
    content: portfolio,
    page: response.page,
    totalPages: response.total_pages,
  };

  return portfolioData;
}

async function getPortfolio(page: number, pageSize: number){
  const response = await client.getByType("portfolio", {
    orderings: {
        field: 'document.last_publication_date',
        direction: 'desc',
    },
    pageSize: pageSize,
    page: page,
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

  const portfolioData = {
    content: portfolio,
    page: response.page,
    totalPages: response.total_pages,
  };

  return portfolioData;
}

export default function Portfolio({portfolio, page, totalPages, generics}: PortfolioProps){
  const [menuCategory, setMenuCategory] = useState("");
  const [galleryView, setGalleryView] = useState(portfolio);
  const [showModal, setShowModal] = useState(false);
  const [detailId, setDetailId] = useState("");
  const [currentPage, setCurrentPage] = useState(page);
  const [currentTotalPages, setCurrentTotalPages] = useState(totalPages);
  const [gallerySize, setGallerySize] = useState({row: 3, page: 9});
  const [layout, setLayout] = useState("desktop");
 
  const router = useRouter();
  const {category} = router.query;  

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
      } else {      
        setGallerySize({row: 2, page: 8});
      }
    }
    handleLayout();

  }, [layout]);

  useEffect(() => {
    if(!menuCategory){
      if(category){
        setMenuCategory(category as string);
      } else {
        setMenuCategory("all");
      }
    }
  }, [gallerySize]);

  useEffect(() => {
    if(menuCategory === "all"){
      const connectPrismic = async () => {
        const portfolioAll = await getPortfolio(1, gallerySize.page);
        setGalleryView(portfolioAll.content);
        setCurrentPage(portfolioAll.page);
        setCurrentTotalPages(portfolioAll.totalPages);
      };
      connectPrismic();
    } else if(menuCategory){
      const connectPrismic = async () => {
        const portfolioByCategory = await getPortfolioByCategory(menuCategory, 1, gallerySize.page);
        setGalleryView(portfolioByCategory.content);
        setCurrentPage(portfolioByCategory.page);
        setCurrentTotalPages(portfolioByCategory.totalPages);
      };
      connectPrismic();
    }
  }, [menuCategory, gallerySize]);
  
  function getModal(modalState: boolean){
    setShowModal(modalState);
  }

  function getPostId(buttonId: string){
    setDetailId(buttonId);
  } 
  
  function handleCategory(category: string){
    setMenuCategory(category);
  }

  async function getPortfolioByPage(category: string, page: number){
    if(category === "all"){
      const allByPage = await getPortfolio(page, gallerySize.page);
      const newPortfolio = galleryView.concat(allByPage.content);
      setGalleryView(newPortfolio);
      setCurrentPage(page);
    } else{
      const categoryByPage = await getPortfolioByCategory(category, page, gallerySize.page);
      const newPortfolio = galleryView.concat(categoryByPage.content);
      setGalleryView(newPortfolio);
      setCurrentPage(page);
    }
  }
  
  const gallery = fixGallerySize(galleryView, generics, gallerySize.row);
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
        <Category category={menuCategory}/>
        <Gallery pictures={gallery} modal={getModal} postId={getPostId} size={gallerySize.row}/>
        {currentPage < currentTotalPages && (
          <div className={styles.seeMore}>
            <button onClick={() => getPortfolioByPage(menuCategory, currentPage+1)}>
              <h1>VIEW MORE</h1>
              <p>더보기</p>
            </button>
          </div>
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
      page: response.page,
      totalPages: response.total_pages,
      generics,
    },
    revalidate: 60 * 10, //essa página será gerada novamente a cada 10 minutos
  }
}