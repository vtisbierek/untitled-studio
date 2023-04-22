import styles from "../styles/Category.module.scss";
import Image from "next/image";
import kakaoIcon from "../../public/images/kakao-icon-square.png";

interface CategoryProps{
    category: string;
}

const content = [
    {
        code: "card",
        title: "Business card",
        titleKR: "명함",
        description: "넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄",
    }, {
        code: "logo",
        title: "Logo",
        titleKR: "로고",
        description: "넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄",
    }, {
        code: "retouching",
        title: "Retouching",
        titleKR: "리터칭",
        description: "넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄",
    }, {
        code: "printing",
        title: "Printing",
        titleKR: "인쇄물",
        description: "넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄",
    }, {
        code: "web",
        title: "Web contents",
        titleKR: "웹컨텐츠",
        description: "넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄",
    }, {
        code: "uiux",
        title: "UI & UX",
        titleKR: "웹 UI & UX",
        description: "넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄 넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄넥스토 제품 안내카드 디자인 & 인쇄",
    }
];

export default function Category({category}: CategoryProps){   

    const menuCategory = content.find(item => item.code === category);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h1>{menuCategory?.title} <span>{menuCategory?.titleKR}</span></h1>
                    <p>{menuCategory?.description}</p>
                </div>
                <div className={styles.logo}>
                    <a className={styles.kakaoButton} href="http://pf.kakao.com/_Zgmxixj/chat" target="_blank">
                        <Image src={kakaoIcon} alt="kakao icon" />
                    </a>
                    <span>상담하기</span>
                </div>   
            </div>
        </div>
    );
}