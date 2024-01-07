import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function SeekCountDisplay({ seekCount }) {
    return (
        <Card
            sx={{
                width: "100%",
                padding: 0,
                marginTop: 1,
                background:"rgba(255, 255, 255, 0.7)", backdropFilter: "blur(10px)", borderRadius: 3
            }}
        >
            <CardContent>
                <Typography
                    sx={{
                        fontSize: { xs: 18, md: 22 },
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                    color="text.secondary"

                >
                    Seek Time: {seekCount}
                </Typography>
            </CardContent>
        </Card>
    );
}
