import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VideoList({ setLoggedIn }) {
    const { id } = useParams();
    console.log('id on UI = ', id);
    const navigate = useNavigate()
    const [videoId] = React.useState(id);
    console.log('videoId = ', videoId);
    const [videoInfo, setVideoInfo] = React.useState([]);
    console.log('videoInfo = ', videoInfo);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                console.log('token =',token)
                const {data} = await axios.get(`http://localhost:5000/video?id=${videoId}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setVideoInfo(data)
            } catch {
                setLoggedIn(false);
                navigate('/')
            }
        }
        fetchData();
    }, [videoId, navigate, setLoggedIn]);
    return (
<Container>
    <Grid item xs={12} md={12} marginTop={2}>
        <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    <video autoPlay controls width='200'>
                        <source src={`http://localhost:5000/video/${videoId}`} type='video/mp4' />
                    </video>
                </CardContent>
            </Card>
        </CardActionArea>
    </Grid>
    <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="primary">
                Created by:{videoInfo.createdBy?.fullname}
            </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="primary">
                Created: {videoInfo.uploadDate}
            </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
            <Typography variant="h5">
                {videoInfo.title}
            </Typography>
        </Grid>
    </Grid>
</Container>
    );
}
