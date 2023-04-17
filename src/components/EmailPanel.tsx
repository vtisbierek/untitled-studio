import styles from "../styles/EmailPanel.module.scss";
import {RiKakaoTalkFill, RiWhatsappFill, RiMailFill} from "react-icons/ri";
import {IoMdMail} from "react-icons/io";

export default function EmailPanel(){
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
                        <form>
                            <label>Name / 성함</label>
                            <input type="text" placeholder="성함을 입력해주세요." className={styles.textEntry}/>
                            <label>Email / 이메일</label>
                            <input type="email" placeholder="이메일을 입력해주세요." className={styles.textEntry}/>
                            <label>Category / 상담 카테고리</label>
                            <select name="business" id="business">
                                <option value="card">Business card 명함</option>
                                <option value="logo">Logo 로고</option>
                                <option value="retouching">Retouching 리터칭</option>
                                <option value="printing">Printing 인쇄물</option>
                                <option value="web">Web contents 웹컨텐츠</option>
                                <option value="uiux">UI & UX 웹 UI & UX</option>
                            </select>
                            <label>Message / 상담내용</label>
                            <textarea placeholder="상담내용을 적어주세요." className={styles.textEntry}/>
                        </form>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightContent}>
                        <h1>Feel free to contact us for any project or information.</h1>
                        <p>궁금하신 점 또는 상담을 원하실 경우 부담없이 연락주세요.</p>
                        <button className={styles.sendButton}>Send</button>
                        <div className={styles.socialButtons}>
                            <div className={styles.socialSet}>
                                <button className={styles.emailButton}>
                                    <IoMdMail />
                                </button>
                                <span>이메일</span>
                                <span>E-MAIL</span>
                            </div>
                            <div className={styles.socialSet}>
                                <button className={styles.kakaoButton}>
                                    <RiKakaoTalkFill />
                                </button>
                                <span>카카오채널</span>
                                <span>KAKAO CHANNEL</span>
                            </div>
                            <div className={styles.socialSet}>
                                <button className={styles.whatsappButton}>
                                    <RiWhatsappFill />
                                </button>
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