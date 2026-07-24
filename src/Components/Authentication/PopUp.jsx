import { Modal } from 'antd';
import { useState } from 'react';
import { AuthForm } from './AuthForm';
import './Authentication.css';

export default function PopUp({ handleClose, open, checkauth }) {

    // Allow switching between login / signup while the modal stays open.
    const [mode, setMode] = useState(checkauth);

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            closable={false}
            centered
            width={{ xs: '92vw', sm: 460 }}
            classNames={{ content: 'authModal', mask: 'authMask' }}
            styles={{ body: { padding: 0 } }}
            destroyOnHidden
            afterOpenChange={(o) => { if (o) setMode(checkauth); }}
        >
            <AuthForm
                mode={mode || checkauth}
                onClose={handleClose}
                switchMode={setMode}
            />
        </Modal>
    );
}
