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

export default function Carousel(){
    const slider = useRef<Slider>(null);

    const settings = {
        autoplay: true,
        vertical: true,
        adaptiveHeight: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.carousel}>
            <Slider ref={slider} {...settings}>
                <div className={styles.slide}>
                    <Image src={logo1} alt="logo 1"/>
                    <div className={styles.slideCaption}>

                    </div>
                </div>
                <div>
                    <Image src={logo2} alt="logo 2"/>
                </div>
                <div>
                    <Image src={logo3} alt="logo 3"/>
                </div>
            </Slider>
            <button onClick={() => slider?.current?.slickPrev()} className={styles.prevButton}>
                <IoIosArrowUp />
            </button>
            <button onClick={() => slider?.current?.slickNext()} className={styles.nextButton}>
                <IoIosArrowDown />
            </button>
{/*             <div className={styles.infoPanel}>

            </div> */}
        </div>
    );
}