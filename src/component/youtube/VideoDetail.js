import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSelectedVideo } from '../../action/youtube';
import '../../assets/css/selected-video.scss';

const VideoDetail = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch();

    const video = useSelector(state => state.youtube.videos.selectedVideo[0]);

    useEffect(() => {
        dispatch(getSelectedVideo(videoId));

        window.scrollTo(0, 0);
    }, [videoId, dispatch]);

    const copyText = (txt) => navigator.clipboard.writeText(txt);

    return (
        <Container maxWidth="lg" className='selected-video'>
            <Grid container spacing={2}>
                <Grid item xs={12} onClick={() => copyText(video?.title)} className='item'>
                    <h4>{video?.title} </h4>
                </Grid>
                <Grid item xs={4} onClick={() => copyText(video?.thumbnail)} className='item'>
                    <img style={{ width: "600px", height: "350px" }} src={video?.thumbnail} alt="" />
                </Grid>
                <Grid item xs={12} onClick={() => copyText(video?.description)} className='item'>
                    <pre>{video?.description}</pre>
                </Grid>
                <Grid item xs={8} onClick={() => copyText(video?.tags)} className='item'>
                    {JSON.stringify(video?.tags)}
                </Grid>
            </Grid>
        </Container>
    );
};

export default VideoDetail;