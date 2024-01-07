import "./App.css";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import LineChart from "./components/LineChart";
import ButtonHolder from "./components/ButtonHolder";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';

import SeekCountDisplay from "./components/SeekCountDisplay";

function App() {
    const [chartData, setChartData] = useState({ labels: null, arr: null });
    const [seekCount, setSeekCount] = useState(0);
    return (
        <div className="outerContainer">
            <div>
                <h1 className="topic">Disk Scheduling Algorithm</h1>
            </div>
            <Container maxWidth="">

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={5}>
                            <ButtonHolder setChartData={setChartData} setSeekCount={setSeekCount} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <LineChart chartData={chartData} />
                            <SeekCountDisplay seekCount={seekCount} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>

    );
}

export default App;
