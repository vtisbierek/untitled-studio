import styles from "../styles/EmailPanel.module.scss";
import emailIcon from "../../public/images/email-icon.png";
import kakaoIcon from "../../public/images/kakao-icon.png";
import whatsappIcon from "../../public/images/whatsapp-icon.png";
import Image from "next/image";
import axios from "axios";
import {useState, useEffect} from "react";
import Modal, {RenderModalBackdropProps} from "react-overlays/Modal";
import {RiCloseFill} from "react-icons/ri";

export default function EmailPanel(){
    const [custName, setCustName] = useState("");
    const [custEmail, setCustEmail] = useState("");
    const [custPhone, setCustPhone] = useState("");
    const [custMessage, setCustMessage] = useState("");
    const [custBusiness, setCustBusiness] = useState("card");
    const [isValidInputs, setIsValidInputs] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [sendMessage, setSendMessage] = useState("");
    const [isBusy, setIsBusy] = useState(false);

    useEffect(() => {
        if(custName && custEmail && custMessage && custBusiness && custPhone && !isBusy){
            setIsValidInputs(true);
        } else {
            setIsValidInputs(false);
        }
    }, [custName, custEmail, custMessage, custBusiness, custPhone, isBusy]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setIsBusy(true);

        const apiEndpoint = process.env.NEXT_PUBLIC_ENDPOINT + "/api/sendcontact";

        const response = await axios.post(apiEndpoint, {
            name: custName,
            email: custEmail,
            phone: custPhone,
            business: custBusiness,
            message: custMessage
        });

        if(response.status === 201){
            setSendMessage("Message sent successfully. Thank you for reaching out to us!");
            setCustName("");
            setCustEmail("");
            setCustPhone("");
            setCustBusiness("card");
            setCustMessage("");
        } else {
            setSendMessage("Failure to send message... please try again or use direct email, Kakao or Whatsapp.");
        }
        setIsBusy(false);
        setShowModal(true);
    }

    const renderBackdrop = (props: RenderModalBackdropProps) => <div className={styles.backdrop} {...props} />;

    return (
        <div className={styles.container}>
            <Modal
                className={styles.modal}
                show={showModal}
                onHide={() => setShowModal(false)}
                renderBackdrop={renderBackdrop}
            >
                <div>
                    <h1 className={styles.modalMessage}>{sendMessage}</h1>
                    <button onClick={() => setShowModal(false)} className={styles.buttonClose}>
                        <RiCloseFill />
                    </button>
                </div>
            </Modal>
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
                            <select name="business" id="business" onChange={(e) => setCustBusiness(e.target.value)} value={custBusiness}>
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
                        <p className={styles.mobileOnly}>궁금하신 점 또는 상담을 원하실 경우 부담없이 연락주세요.</p>
                        <button className={styles.mobileOnly} form="emailForm" type="submit" disabled={!isValidInputs}>
                            Send
                        </button>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightContent}>
                        <h1 className={styles.desktopOnly}>Feel free to contact us for any project or information.</h1>
                        <p className={styles.desktopOnly}>궁금하신 점 또는 상담을 원하실 경우 부담없이 연락주세요.</p>
                        <button className={styles.desktopOnly} form="emailForm" type="submit" disabled={!isValidInputs}>
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