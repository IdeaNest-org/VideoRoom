import { createRoot } from 'react-dom/client';
import { ReactElement, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@mui/material';

export interface ConfirmProps {
    title?: ReactElement | string;
    content?: ReactElement | string;
    onCancel?: Function;
    onOk?: Function;
}

export function confirm(
    props: ConfirmProps = { title: '提示', content: '请确认' }
) {
    const promise = new Promise((resolve, reject) => {
        const confirmDialog = (
            <ConfirmDialog
                {...props}
                onCancel={() => {
                    resolve(false);
                }}
                onOk={() => {
                    resolve(true);
                }}
            ></ConfirmDialog>
        );
        let dialogElement = document.getElementById('dialog-root');
        if (!dialogElement) {
            dialogElement = document.createElement('div');
            dialogElement.id = 'dialog-root';
            document.getElementsByTagName('body')[0].appendChild(dialogElement);
        }
        createRoot(dialogElement).render(confirmDialog);
    });

    return promise;
}

function ConfirmDialog({
    content,
    title,
    onCancel = () => {},
    onOk = () => {},
}: ConfirmProps) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setIsOpen(false);
                        onCancel();
                    }}
                >
                    取消
                </Button>
                <Button
                    onClick={() => {
                        setIsOpen(false);
                        onOk();
                    }}
                    autoFocus
                >
                    确定
                </Button>
            </DialogActions>
        </Dialog>
    );
}
