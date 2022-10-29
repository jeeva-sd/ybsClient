import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, CardActionArea, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { getYoutubeVideos } from '../../action/youtube';
import '../../assets/css/youtube-home.scss';

const VideoCard = () => {
    const dispatch = useDispatch();
    const videos = useSelector(state => state.youtube.videos.data);
    const searchText = useSelector(state => state.youtube.videos.searchText);

    const [videoList, setVideoList] = useState([]);

    useEffect(() => dispatch(getYoutubeVideos()), [dispatch]);

    useEffect(() => {
        if (videos && videos.length > 0) {
            if (searchText && searchText.trim().length > 0) {
                const filteredVideo = videos.filter(video => video.title.toLowerCase().includes(searchText.toLowerCase()));
                setVideoList(filteredVideo);
            } else {
                setVideoList(videos);
            }
        }
    }, [videos, searchText]);

    const handleVideo = videoId => window.open(`https://www.youtube.com/watch?v=${videoId}`);

    return (
        <Container maxWidth="lg" className='yt-container'>
            <Grid container spacing={2} >
                {videoList && videoList.length > 0 ? videoList.map((item, index) => {
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
            </Grid >
        </Container>
    );
};

export default VideoCard;