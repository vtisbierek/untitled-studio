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

export default function Portfolio({portfolio, page, totalPages, generics}: PortfolioProps){
    const [menuCategory, setMenuCategory] = useState("all");
    const router = useRouter();
    const {category} = router.query;  

    useEffect(() => {
        if(category){
            setMenuCategory(category as string);
        }
    }, []);  

    function handleCategory(category: string){
        setMenuCategory(category);
    }

    return (
        <div className={styles.container}>
            <Header />
            <Headline currentMenu={menuCategory} selectedMenu={handleCategory}/>
            {menuCategory !== "all" && (
                <Category category={menuCategory}/>
            )}
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => { 
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
        portfolio,
        page: responsePortfolio.page,
        totalPages: responsePortfolio.total_pages,
        generics,
      },
      revalidate: 60 * 10, //essa página será gerada novamente a cada 10 minutos
    }
  }