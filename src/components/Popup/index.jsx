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
function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Card
                style={{
                    padding: 20,
                }}
            >
                <FormGroup>
                    <FormControlLabel
                        control={<Switch name="enable" />}
                        label="ENABLE"
                    />
                </FormGroup>
            </Card>
        </ThemeProvider>
    );
}

export default App;
