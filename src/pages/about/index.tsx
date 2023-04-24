import Header from "@/components/Header";
import styles from "../../styles/About.module.scss";
import Footer from "@/components/Footer";

export default function About(){
    return (
        <div className={styles.container}>
            <Header />
            <Footer />
        </div>
    );
}