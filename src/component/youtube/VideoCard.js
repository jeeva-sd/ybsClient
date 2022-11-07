import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, CardActionArea, CircularProgress, Grid } from '@mui/material';
import { Container } from '@mui/system';
import '../../assets/css/youtube-home.scss';

const VideoCard = () => {
    const navigate = useNavigate();
    const videos = useSelector(state => state.youtube.videos.data);
    // const searchText = useSelector(state => state.youtube.videos.searchText);
    const isRequesting = useSelector(state => state.youtube.videos.isRequesting);

    const handleVideo = videoId => navigate(`${videoId}`);

    return (
        <Container maxWidth="lg" className='yt-container'>
            {!isRequesting && <Grid container spacing={2}>
                {videos && videos.length > 0 ? videos.map((item, index) => {
                    return (
                        <Grid item xs={10} md={3} key={index} onClick={() => handleVideo(item.videoId)}>
                            <Card className='card yt-card card-highlight'>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        loading='lazy'
                                        height="140"
                                        image={item.thumbnail}
                                        alt={item.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="span">
                                            {item.channelTitle}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className='published-time'>
                                            {moment(item.publishedAt).format('DD MMM YYYY')}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" className='video-title'>
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                }) :
                    <Grid container
                        direction="column"
                        alignItems="center"
                        item xs={12}>
                        <Alert severity="error"> No video found</Alert>
                    </Grid>}
            </Grid >}

            {isRequesting && <Grid container
                direction="column"
                alignItems="center">
                <Grid item xs={12}>
                    <CircularProgress disableShrink />
                </Grid>
            </Grid>}
        </Container>
    );
};

export default VideoCard;