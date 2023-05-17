import Header from "@/components/Header";
import styles from "../../styles/Contact.module.scss";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Contact(){
    return (
        <>
            <Head>
                <title>Untitled Studio | Portfolio</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className={styles.container}>
                <Header />
                <Footer />
            </div>
        </>
    );
}