import React, { useState, useEffect } from 'react';
import {
    Switch,
    ThemeProvider,
    createTheme,
    FormControlLabel,
    FormGroup,
    Card,
} from '@mui/material';
import './style.css';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
function Popup() {
    const [debug, setDebug] = useState(Boolean(localStorage.getItem('is_dev')));
    useEffect(() => {
        localStorage.setItem('is_dev', debug ? 'true' : '');
    }, [debug]);
    return (
        <ThemeProvider theme={darkTheme}>
            <Card
                style={{
                    padding: 20,
                }}
            >
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                name="enable"
                                checked={debug}
                                onChange={(e) => {
                                    setDebug(e.target.checked);
                                }}
                            />
                        }
                        label="DEBUG"
                    />
                </FormGroup>
            </Card>
        </ThemeProvider>
    );
}

export default Popup;
