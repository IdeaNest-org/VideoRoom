import React from 'react';
import { ButtonGroup, Button, Fab, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CopyToClipboard from 'react-copy-to-clipboard';
import useStatusBar from './hooks/useStatusBar';

export default function StatusBar({ ...props }) {
    const {
        isOpen,
        roomId,
        createRoom,
        acceptInvite,
        toggle,
        exitRoom,
        status,
        inviteRoomId,
        isInRoom,
        video,
        userList = [],
    } = useStatusBar();
    const location = window.location;
    const search = location.search
        ? location.search.replace('?', '?roomId=' + roomId + '&')
        : '?roomId=' + roomId;
    const shareLink =
        location.protocol +
        '//' +
        location.hostname +
        location.pathname +
        search +
        location.hash;
    return video ? (
        <Box
            {...props}
            style={{
                position: 'fixed',
                right: 20,
                bottom: 20,
                zIndex: 1000,
            }}
        >
            {isOpen && (
                <ButtonGroup
                    style={{
                        marginRight: 10,
                    }}
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    {!roomId && (
                        <>
                            <Button onClick={createRoom}>Creat Room</Button>
                            {inviteRoomId && (
                                <Button onClick={acceptInvite}>Join</Button>
                            )}
                        </>
                    )}

                    {roomId && (
                        <>
                            {isInRoom && (
                                <Button>{userList.length} onLine</Button>
                            )}
                            <Button onClick={exitRoom}>Exit</Button>
                            <CopyToClipboard
                                onCopy={() => {
                                    alert('link copied to clipboard');
                                }}
                                text={`${shareLink}`}
                            >
                                <Button>Room Link</Button>
                            </CopyToClipboard>
                        </>
                    )}
                </ButtonGroup>
            )}
            <Fab
                disabled={status !== 'online'}
                onClick={toggle}
                aria-label="like"
                color="primary"
            >
                <FavoriteIcon />
            </Fab>
        </Box>
    ) : (
        <></>
    );
}
