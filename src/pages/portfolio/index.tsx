import styles from "../../styles/Portfolio.module.scss";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Headline from "@/components/Headline";
import Category from "@/components/Category";

export default function Portfolio(){
    return (
        <div className={styles.container}>
            <Header />
            <Headline />
            <Category />
            <Footer />
        </div>
    );
}