import {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.scss";

interface ModalProps{
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
}

export default function Modal({show, onClose, children}: ModalProps){
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    function handleClose(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h1>oi mundo</h1>
                <p>{children}</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>

    ) : null;

    if(isBrowser){
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")!
        );
    } else {
        return null;
    }   
}