import styles from "../styles/Category.module.scss";
import Image from "next/image";
import kakaoIcon from "../../public/images/kakao-icon-square.png";
import {useState, useEffect} from "react";

interface CategoryProps{
    category: string;
}

const content = [
    {
        code: "card",
        title: "Business card",
        titleKR: "명함",
        description: "명함은 고객과 소통을 시작하면서 보여주는 회사의 첫 시각적인 정보입니다. 읽지 않아도 회사의 분위기와 첫이미지를 주기 좋은 브랜드 전략입니다.",
    }, {
        code: "logo",
        title: "Logo",
        titleKR: "로고",
        description: "로고는 회사의 철학, 비전, 목적, 전문분야등을 모두 함축해 보여주는 중요한 시각이미지입니다. 고객에게 회사 이미지를 각인시키고 집중시키는 브랜드 정체성을 확실하게 주기위해 꼭 필요합니다.",
    }, {
        code: "retouching",
        title: "Retouching",
        titleKR: "리터칭",
        description: "사진 리터칭(후보정)은 모델 사진 & 제품 사진 마무리에 꼭 필요한 과정입니다. 고객의 시각적인 집중을 최대한 끌어들여 제품 판매까지 이루어지게 하는 리터칭, 10년 전문가 언타이틀 스튜디오에 맡겨보세요.",
    }, {
        code: "printing",
        title: "Printing",
        titleKR: "인쇄물",
        description: "에디토리얼(인쇄물)은 사람들에게 전달하는 정보가 많은 만큼 그래픽 또는 시각적인 이미지가 필수입니다. 인쇄물은 더더욱 전문 디자이너의 손을 거쳐야 고객에게 전달하고 싶은 정보들의 본질을 정확하게 이끌어내어 시각적으로 전달합니다.",
    }, {
        code: "web",
        title: "Web contents",
        titleKR: "웹컨텐츠",
        description: "웹컨텐츠는 없어서는 안될 웹광고 방식의 하나로 정보정달 및 브랜드 및 이벤트 기억 각인을 위해 꼭 필요한 디자인 홍보수단입니다.",
    }, {
        code: "uiux",
        title: "UI & UX",
        titleKR: "웹 UI & UX",
        description: "UI&UX 디자인은 클라이언트의 고객들에게 친화적인 웹사이트&앱을 제공하며, 브랜드에 대해 긍정적인 인식을 심어줄 수 있는 디자인입니다. 제품판매율 향상 및 정확한 정보전달을 위해서도 꼭 필요한 디자인입니다.",
    }
];

export default function Category({category}: CategoryProps){
    const [menuCategory, setMenuCategory] = useState(content[0]);
    
    useEffect(() => {
        if(category !== "all"){
            const newCategory = content.find(item => item.code === category)!;
            setMenuCategory(newCategory);
        }
    }, [category]); 

    return (
        <div className={category !== "all" ? styles.container : styles.containerClosed}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h1>{menuCategory?.title} <span>{menuCategory?.titleKR}</span></h1>
                    <p>{menuCategory?.description}</p>
                    <div className={styles.logoMobile}>
                        <a className={styles.kakaoButton} href="http://pf.kakao.com/_Zgmxixj/chat" target="_blank">
                            <Image src={kakaoIcon} alt="kakao icon" />
                        </a>
                        <span>상담하기</span>
                    </div> 
                </div>
                <div className={styles.textMobile}>
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