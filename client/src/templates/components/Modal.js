import React from 'react';
import ReactDOM from 'react-dom';

import { FaTimes } from 'react-icons/fa';
import Button from '@/templates/components/Button'

import { useDispatch, useSelector } from 'react-redux';
import { handleAuthModal, handleModal } from '@/store/actions';

function Overlay() {
    return (
        <div className="absolute z-40 w-full h-full bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm" />
    );
}
function OverlayPortal() {
    return ReactDOM.createPortal(<Overlay />, document.getElementById('overlay'));
}
function ModalPortal(props) {
    return ReactDOM.createPortal(
        props.children,
        document.getElementById('modal')
    );
}

export default function Modal({small, title, children}) {

    const dispatch = useDispatch()
    
    const {authModal, modal} = useSelector((state) => state.ui)

    const closeModal = () => {
        if(authModal)
            dispatch(handleAuthModal(!authModal))
        
        if(modal)
            dispatch(handleModal(!modal))
    }

    return (
        <>
            <OverlayPortal />
            <ModalPortal>
                <div
                    className={`w-2/3 ${small ? '2xl:w-1/3' : '2xl:w-1/2'
                        } fixed z-50 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-white border rounded-lg overflow-hidden shadow-lg drop-shadow-lg`}
                >
                    <div className="py-3 px-6 bg-gray-100 text-gray-600 border shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="uppercase">{title}</h3>
                            <Button btn="error"
                                size="sm"
                                icon={<FaTimes />}
                                onClick={() => closeModal()}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 py-10 px-24">
                        {children}
                    </div>
                </div>
            </ModalPortal>
        </>
    );
}
