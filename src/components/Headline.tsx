import styles from "../styles/Headline.module.scss";
import Link from 'next/link';

export default function Headline(){
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <Link href="/portfolio">
                        <h1>PORTFOLIO <span>포트폴리오</span></h1>
                    </Link>
                </div>
                <div className={styles.categories}>
                    <button>
                        <p>#BUSINESS CARD <span>명함</span></p>
                    </button>
                    <button>
                        <p>#LOGO <span>로고</span></p>
                    </button>
                    <button>
                        <p>#RETOUCHING <span>리터칭</span></p>
                    </button>
                    <button>
                        <p>#PRINTING <span>인쇄</span></p>
                    </button>
                    <button>
                        <p>#WEB CONTENT <span>웹컨텐츠</span></p>
                    </button>
                    <button>
                        <p>#UI & UX</p>
                    </button>
                </div>
            </div>
        </div>
    );
}