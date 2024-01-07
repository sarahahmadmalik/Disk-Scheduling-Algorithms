import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectMechanism from "./SelectMechanism";
import SelectDirection from "./SelectDirection";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import FCFS from "../mechanisms/fcfs";
import SSTF from "../mechanisms/sstf";
import SCAN from "../mechanisms/scan";
import CSCAN from "../mechanisms/cscan";

export default function ButtonHolder({ setChartData, setSeekCount, setCurr_seek, curr_seek }) {
    const [mechanism, setMechanism] = React.useState("");
    const [direction, setDirection] = React.useState("");
    const [diskStartPoint, setDiskStartPoint] = React.useState("");
    const [diskEndPoint, setDiskEndPoint] = React.useState("");
    const [diskCurrentPosition, setDiskCurrentPosition] = React.useState("");
    const [diskRequestInput, setDiskRequestInput] = React.useState("");

    function update_chart(seek_count, arr) {
        let labels = [...Array(arr.length + 1).keys()];
        arr = [Number(diskCurrentPosition), ...arr];
        setChartData({ labels, arr });
        setSeekCount(seek_count);
    }

    async function run_handler() {
        // console.log(Number(diskStartPoint));
        // console.log(Number(diskEndPoint));
        // console.log(Number(diskCurrentPosition));

        let req_array = diskRequestInput.split(" ").map(Number);
        console.log(req_array);

        if (mechanism === "FCFS" || mechanism === "SCAN" || mechanism === "SSTF" || mechanism === "CSCAN") {
            console.log(mechanism);


            async function calculateStep() {
             
                    let { seek_count, arr } = mechanism === "FCFS"
                        ? await FCFS(req_array, Number(diskCurrentPosition), setChartData, setSeekCount, setCurr_seek, curr_seek)
                        : mechanism === "SCAN"
                            ? SCAN(req_array, Number(diskCurrentPosition), direction, setChartData, setSeekCount, setCurr_seek, curr_seek)
                            : mechanism === "SSTF"
                                ? SSTF(req_array, Number(diskCurrentPosition), setChartData, setSeekCount,setCurr_seek, curr_seek )
                                : CSCAN(req_array, Number(diskCurrentPosition), setChartData, setSeekCount,setCurr_seek, curr_seek);
                    
                
            }

            calculateStep();
        }
    }

    function clear_handler() {
        setDiskStartPoint("");
        setDiskEndPoint("");
        setDiskCurrentPosition("");
        setDiskRequestInput("");
    }

    return (
        <Card sx={{ minWidth: 275, marginBottom: 2, background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(10px)", borderRadius: 4 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom marginBottom={2}>
                    Disk Scheduling
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "space-between",
                    }}
                >
                    <SelectMechanism mechanism={mechanism} setMechanism={setMechanism} />
                    <TextField
                        id="startPoint"
                        label="Disk start point"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => {
                            setDiskStartPoint(e.target.value);
                        }}
                    />
                    <TextField
                        id="endPoint"
                        label="Disk end point"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => {
                            setDiskEndPoint(e.target.value);
                        }}
                    />
                    <TextField
                        id="currentPos"
                        label="Disk current position"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => {
                            setDiskCurrentPosition(e.target.value);
                        }}
                    />
                    <TextField
                        id="requestInput"
                        label="Request array"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => {
                            setDiskRequestInput(e.target.value);
                        }}
                    />
                    {mechanism === "SCAN" ? (
                        <SelectDirection direction={direction} setDirection={setDirection} />
                    ) : null}
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    onClick={run_handler}
                    size="small"
                    style={{ backgroundColor: "#4CAF50", color: "white", margin: "10px", "&:hover": { backgroundColor: "#45a049" } }}
                >
                    Run
                </Button>
                <Button
                    onClick={clear_handler}
                    size="small"
                    style={{ backgroundColor: "#f44336", color: "white", "&:hover": { backgroundColor: "#d32f2f" } }}
                >
                    Clear
                </Button>
            </CardActions>
        </Card>
    );
}
