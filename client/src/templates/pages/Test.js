import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { FaBell } from 'react-icons/fa';
import Modal from '@/templates/components/Modal'
import Button from '@/templates/components/Button'

import { setToast, handleModal } from '@/store/actions';

export default function Test() {
    
    const dispatch = useDispatch()

    const {modal} = useSelector((state) => state.ui)

    return (
        <>
        <h1>Test</h1>
        <Button btn="info"
                size="lg"
                text="toast"
                icon={<FaBell />}
                onClick={() => dispatch(setToast({type: 'info', message: 'Lorem ipsum dolor sit amet'}))}/>
        <Button btn="success"
                size="lg"
                text="modal"
                onClick={() => dispatch(handleModal(!modal))} />

        {modal && <Modal title="test">
                    <p>modal test</p>
                </Modal>}
        </>
    )
}