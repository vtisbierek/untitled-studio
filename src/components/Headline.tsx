import styles from "../styles/Headline.module.scss";
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeadlineProps{
    currentMenu: string;
    selectedMenu: (category: string) => void;
}

export default function Headline({currentMenu, selectedMenu}: HeadlineProps){
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <button
                        value="all" 
                        onClick={(e) => {
                            selectedMenu(e.currentTarget.value);
                            router.push('/portfolio', '/portfolio', { shallow: true });
                        }}>
                        <h1>PORTFOLIO <span>포트폴리오</span></h1>
                        <p>포트폴리오</p>
                    </button>
                </div>
                <div className={styles.categories}>
                    <button
                        value="card"
                        onClick={(e) => {
                            selectedMenu(e.currentTarget.value);
                            router.push('/portfolio', '/portfolio/card', { shallow: true });
                        }}
                        className={currentMenu === "card" ? styles.isSelected : styles.notSelected}
                    >
                        <p>#BUSINESS CARD <span>명함</span></p>
                        <h3>명함</h3>
                    </button>
                    <button
                        value="logo"
                        onClick={(e) => {
                            selectedMenu(e.currentTarget.value);
                            router.push('/portfolio', '/portfolio/logo', { shallow: true });
                        }}
                        className={currentMenu === "logo" ? styles.isSelected : styles.notSelected}
                    >
                        <p>#LOGO <span>로고</span></p>
                        <h3>로고</h3>
                    </button>
                    <button
                        value="retouching"
                        onClick={(e) => {
                            selectedMenu(e.currentTarget.value);
                            router.push('/portfolio', '/portfolio/retouching', { shallow: true });
                        }}
                        className={currentMenu === "retouching" ? styles.isSelected : styles.notSelected}
                    >
                        <p>#RETOUCHING <span>리터칭</span></p>
                        <h3>리터칭</h3>
                    </button>
                    <button
                        value="printing"
                        onClick={(e) => {
                            selectedMenu(e.currentTarget.value);
                            router.push('/portfolio', '/portfolio/printing', { shallow: true });
                        }}
                        className={currentMenu === "printing" ? styles.isSelected : styles.notSelected}
                    >
                        <p>#PRINTING <span>인쇄물</span></p>
                        <h3>인쇄물</h3>
                    </button>
                    <button
                        value="web"
                        onClick={(e) => {
                            selectedMenu(e.currentTarget.value);
                            router.push('/portfolio', '/portfolio/web', { shallow: true });
                        }}
                        className={currentMenu === "web" ? styles.isSelected : styles.notSelected}    
                    >
                        <p>#WEB CONTENTS <span>웹컨텐츠</span></p>
                        <h3>웹컨텐츠</h3>
                    </button>
                    <button
                        id="uiux"
                        value="uiux"
                        onClick={(e) => {
                            selectedMenu(e.currentTarget.value);
                            router.push('/portfolio', '/portfolio/uiux', { shallow: true });
                        }}
                        className={currentMenu === "uiux" ? styles.isSelected : styles.notSelected}    
                    >
                        <p>#UI & UX</p>
                        <h3>UI & UX</h3>
                    </button>
                </div>
            </div>
        </div>
    );
}