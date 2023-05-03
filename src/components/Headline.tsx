import styles from "../styles/Headline.module.scss";
import Link from 'next/link';

interface HeadlineProps{
    currentMenu: string;
    selectedMenu: (category: string) => void;
}

export default function Headline({currentMenu, selectedMenu}: HeadlineProps){
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <button value="all" onClick={(e) => selectedMenu(e.currentTarget.value)}>
                        <h1>PORTFOLIO <span>포트폴리오</span></h1>
                    </button>
                </div>
                <div className={styles.categories}>
                    <button
                        value="card"
                        onClick={(e) => selectedMenu(e.currentTarget.value)}
                        className={currentMenu === "card" ? styles.isSelected : styles.notSelected}
                    >
                        <p>#BUSINESS CARD <span>명함</span></p>
                    </button>
                    <button
                        value="logo"
                        onClick={(e) => selectedMenu(e.currentTarget.value)}
                        className={currentMenu === "logo" ? styles.isSelected : styles.notSelected}
                    >
                        <p>#LOGO <span>로고</span></p>
                    </button>
                    <button
                        value="retouching"
                        onClick={(e) => selectedMenu(e.currentTarget.value)}
                        className={currentMenu === "retouching" ? styles.isSelected : styles.notSelected}
                    >
                        <p>#RETOUCHING <span>리터칭</span></p>
                    </button>
                    <button
                        value="printing"
                        onClick={(e) => selectedMenu(e.currentTarget.value)}
                        className={currentMenu === "printing" ? styles.isSelected : styles.notSelected}
                    >
                        <p>#PRINTING <span>인쇄물</span></p>
                    </button>
                    <button
                        value="web"
                        onClick={(e) => selectedMenu(e.currentTarget.value)}
                        className={currentMenu === "web" ? styles.isSelected : styles.notSelected}    
                    >
                        <p>#WEB CONTENTS <span>웹컨텐츠</span></p>
                    </button>
                    <button
                        value="uiux"
                        onClick={(e) => selectedMenu(e.currentTarget.value)}
                        className={currentMenu === "uiux" ? styles.isSelected : styles.notSelected}    
                    >
                        <p>#UI & UX</p>
                    </button>
                </div>
            </div>
        </div>
    );
}