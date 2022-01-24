import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { FaBell } from 'react-icons/fa';
import Modal from '@/templates/components/Modal'
import Button from '@/templates/components/Button'
import Card from '@/templates/components/Card';
import FormTest from '@/templates/forms/Test';


import { setToast, handleModal } from '@/store/actions';

export default function Test() {

    const dispatch = useDispatch()

    const { modal } = useSelector((state) => state.ui)

    return (
        <>
            <h1 className='text-center text-2xl	py-3'>Test</h1>
            <div className='flex justify-center items-center'>
                {modal && <Modal title="test">
                    <p>modal test</p>
                </Modal>}
                <Button btn="info"
                    text="toast"
                    icon={<FaBell />}
                    onClick={() => dispatch(setToast({ type: 'info', message: 'Lorem ipsum dolor sit amet' }))} />
                <Button btn="success"
                    size="lg"
                    text="modal"
                    onClick={() => dispatch(handleModal(!modal))} />
                <Button btn="warning"
                    size="sm"
                    text="random"
                    style="italic"
                    href="/random" />
            </div>
            <Card title="test form">
                <FormTest />
            </Card>
        </>
    )
}