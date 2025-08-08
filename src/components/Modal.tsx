import {ReactNode} from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex
                        items-center justify-center
                        bg-transparent bg-opacity-50">
            <div className="bg-white rounded-lg
                            shadow-lg p-6 max-w-md
                            w-full relative">
                <button
                    className="absolute top-2 right-2 border border-gray-300 rounded-sm p-2
                                hover:text-gray-700 font-medium text-black"
                    onClick={onClose}
                >
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};
export default Modal;