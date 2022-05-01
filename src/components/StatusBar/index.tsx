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
    return (
        <Box {...props}>
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
                            <Button onClick={createRoom}>创建房间</Button>
                            {inviteRoomId && (
                                <Button onClick={acceptInvite}>加入邀请</Button>
                            )}
                        </>
                    )}

                    {roomId && (
                        <>
                            {isInRoom && (
                                <Button>当前{userList.length}人</Button>
                            )}
                            <Button onClick={exitRoom}>退出房间</Button>
                            <CopyToClipboard
                                onCopy={() => {
                                    alert('分享链接复制成功');
                                }}
                                text={`${shareLink}`}
                            >
                                <Button>分享</Button>
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
    );
}
