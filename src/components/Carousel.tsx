import styles from "../styles/Carousel.module.scss";
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
                {carouselData.map(slide => (
                    <div className={styles.slide}>
                        <img src={slide.image} alt={slide.title}/>
                        <div className={styles.slideCaption}>
                            <h1>
                                {slide.title}
                            </h1>
                            <h1>
                                {slide.description}
                            </h1>
                            <p>
                                {slide.descriptionKR}
                            </p>
                        </div>
                    </div>
                ))} 
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