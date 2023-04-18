import styles from "../styles/Carousel.module.scss";
import Image from "next/image";
import logo1 from "../../public/images/logo01.jpg";
import logo2 from "../../public/images/logo02.jpg";
import logo3 from "../../public/images/logo03.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import {IoIosArrowDown} from "react-icons/io";
import {IoIosArrowUp} from "react-icons/io";

type Carousel = {
    image: string;
    title: string;
    description: string;
    descriptionKR: string;
}
  
interface CarouselProps{
    carouselData: Carousel[];
}

export default function Carousel({carouselData}: CarouselProps){
    const slider = useRef<Slider>(null);

    const settings = {
        autoplay: true,
        vertical: true,
        //adaptiveHeight: true,
        //variableWidth: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.carouselPanel}>
            <Slider ref={slider} {...settings} className={styles.carousel}>
                <div className={styles.slide}>
                    <Image src={logo1} alt="logo 1"/>
                    <div className={styles.slideCaption}>
                        <h1>
                            {carouselData[0].title}
                        </h1>
                        <h1>
                            Logo Brand
                        </h1>
                        <p>
                            사기 로고 브랜드 제작
                        </p>
                    </div>
                </div>
                <div className={styles.slide}>
                    <Image src={logo2} alt="logo 2"/>
                    <div className={styles.slideCaption}>
                        <h1>
                            AMIABLE 2 -
                        </h1>
                        <h1>
                            Logo Brand
                        </h1>
                        <p>
                            사기 로고 브랜드 제작
                        </p>
                    </div>
                </div>
                <div className={styles.slide}>
                    <Image src={logo3} alt="logo 3"/>
                    <div className={styles.slideCaption}>
                        <h1>
                            AMIABLE 3 -
                        </h1>
                        <h1>
                            Logo Brand
                        </h1>
                        <p>
                            사기 로고 브랜드 제작
                        </p>
                    </div>
                </div>
            </Slider>
            <button onClick={() => slider?.current?.slickPrev()} className={styles.prevButton}>
                <IoIosArrowUp />
            </button>
            <button onClick={() => slider?.current?.slickNext()} className={styles.nextButton}>
                <IoIosArrowDown />
            </button>
        </div>
    );
}