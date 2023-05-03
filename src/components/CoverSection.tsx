import styles from "../styles/CoverSection.module.scss";
import Carousel from '@/components/Carousel';
import {useState, useEffect, useRef} from "react";

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
  
  interface CoverProps{
    sectionData: Content;
  }

export default function CoverSection({sectionData}: CoverProps){
    const [divPosition, setDivPosition] = useState({ left: '50%', transform: 'translate(-50%, -50%)' });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleReposition() {
            const screenWidth = window.innerWidth;

            if(screenWidth > 728){
                setDivPosition({ left: "5%", transform: 'translateX(0)'});
            } else {
                const divWidth = ref.current?.offsetWidth!;
                const gap = screenWidth - divWidth;
                const left = `${(gap)}px`;
                setDivPosition({ left: left, transform: 'translateX(-30%)'});
            }
        }
    
        window.addEventListener('resize', handleReposition);
        handleReposition();
        
        //removendo o event listener quando o componente window for desmontado pra evitar memory leaks
        return () => {
            window.removeEventListener('resize', handleReposition);
        }
    }, []);

    return (
        <div className={styles.container}>
            <section className={styles.coverSection}>
                <div className={styles.coverPanel1}>
                    <img src={sectionData.coverSection.left.image} alt={sectionData.coverSection.left.title}/>
                    <div className={styles.coverText}>
                        <h1>
                            {sectionData.coverSection.left.title}
                        </h1>
                        <h1>
                            {sectionData.coverSection.left.description}
                        </h1>
                        <p>
                            {sectionData.coverSection.left.descriptionKR}
                        </p>
                    </div>
                </div>
                <div className={styles.coverPanel2}>
                    <img src={sectionData.coverSection.right.image} alt={sectionData.coverSection.right.title}/>
                    <div className={styles.coverText} ref={ref} style={divPosition}>
                        <h1>
                            {sectionData.coverSection.right.title}
                        </h1>
                        <h1>
                            {sectionData.coverSection.right.description}
                        </h1>
                        <p>
                            {sectionData.coverSection.right.descriptionKR}
                        </p>
                    </div>
                </div>
                <div className={styles.carousel}>
                    <Carousel carouselData={sectionData.carousel}/>   
                </div>
            </section>
        </div>
    );
}