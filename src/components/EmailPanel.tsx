import styles from "../styles/EmailPanel.module.scss";
import emailIcon from "../../public/images/email-icon.png";
import kakaoIcon from "../../public/images/kakao-icon.png";
import whatsappIcon from "../../public/images/whatsapp-icon.png";
import Image from "next/image";
import axios from "axios";
import {useState, useEffect} from "react";

export default function EmailPanel(){
    const [custName, setCustName] = useState("");
    const [custEmail, setCustEmail] = useState("");
    const [custPhone, setCustPhone] = useState("");
    const [custMessage, setCustMessage] = useState("");
    const [custBusiness, setCustBusiness] = useState("card");
    const [isValidInputs, setIsValidInputs] = useState(false);

    useEffect(() => {
        if(custName && custEmail && custMessage && custBusiness && custPhone){
            setIsValidInputs(true);
        } else {
            setIsValidInputs(false);
        }
    }, [custName, custEmail, custMessage, custBusiness, custPhone]);



    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const response = await axios.post("http://localhost:3000/api/sendcontact", {
            name: custName,
            email: custEmail,
            phone: custPhone,
            business: custBusiness,
            message: custMessage
        });

        console.log(response);
    }

    return (
        <div className={styles.container}>
            <div className={styles.emailTitle}>
                <div>
                    <h1>Contact us</h1>
                    <p>상담 및 문의사항</p>
                </div>
            </div>
            <div className={styles.splitPanel}>
                <div className={styles.left}>
                    <div>
                        <form id="emailForm" onSubmit={handleSubmit}>
                            <label>Name / 성함</label>
                            <input
                                type="text"
                                placeholder="성함을 입력해주세요."
                                className={styles.textEntry}
                                value={custName}
                                onChange={(e) => setCustName(e.target.value)}
                            />
                            <label>Email / 이메일</label>
                            <input 
                                type="email"
                                placeholder="이메일을 입력해주세요."
                                className={styles.textEntry}
                                value={custEmail}
                                onChange={(e) => setCustEmail(e.target.value)}
                            />
                            <label>Phone / 전화</label>
                            <input 
                                type="text"
                                placeholder="전화를 입력해주세요."
                                className={styles.textEntry}
                                value={custPhone}
                                onChange={(e) => setCustPhone(e.target.value)}
                            />
                            <label>Category / 상담 카테고리</label>
                            <select name="business" id="business" onChange={(e) => setCustBusiness(e.target.value)}>
                                <option value="card">Business card 명함</option>
                                <option value="logo">Logo 로고</option>
                                <option value="retouching">Retouching 리터칭</option>
                                <option value="printing">Printing 인쇄물</option>
                                <option value="web">Web contents 웹컨텐츠</option>
                                <option value="uiux">UI & UX 웹 UI & UX</option>
                            </select>
                            <label>Message / 상담내용</label>
                            <textarea
                                placeholder="상담내용을 적어주세요."
                                className={styles.textEntry}
                                value={custMessage}
                                onChange={(e) => setCustMessage(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightContent}>
                        <h1>Feel free to contact us for any project or information.</h1>
                        <p>궁금하신 점 또는 상담을 원하실 경우 부담없이 연락주세요.</p>
                        <button className={styles.sendButton} form="emailForm" type="submit" disabled={!isValidInputs}>
                            Send
                        </button>
                        <div className={styles.socialButtons}>
                            <div className={styles.socialSet}>
                                <a className={styles.emailButton} href="mailto:untitled.studio.official@gmail.com" target="_blank">
                                    <Image src={emailIcon} alt="email icon" />
                                </a>
                                <span>이메일</span>
                                <span>E-MAIL</span>
                            </div>
                            <div className={styles.socialSet}>
                                <a className={styles.kakaoButton} href="http://pf.kakao.com/_Zgmxixj/chat" target="_blank">
                                    <Image src={kakaoIcon} alt="kakao talk icon" />
                                </a>
                                <span>카카오채널</span>
                                <span>KAKAO CHANNEL</span>
                            </div>
                            <div className={styles.socialSet}>
                                <a className={styles.whatsappButton} href="https://wa.me/5551996832084" target="_blank">
                                    <Image src={whatsappIcon} alt="whatsapp icon" />
                                </a>
                                <span>왓츠앱</span>
                                <span>WHATSAPP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}