import { Alert, Button, Chip, Container, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { getSelectedVideo, getYoutubeVideos, setVideosRequesting } from '../../action/youtube';
import '../../assets/css/selected-video.scss';
import { getPostCount, setPostDetails } from '../../action/blog';
import moment from 'moment';
import { Box } from '@mui/system';

const VideoDetail = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const video = useSelector(state => state.youtube.videos.selectedVideo[0]);
    const [postUrl, setPostUrl] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getSelectedVideo(videoId));
    }, [videoId, dispatch]);

    const copyText = (txt) => navigator.clipboard.writeText(txt);

    const updatePostDetails = () => {
        if (postUrl && postUrl.trim().length === 0) return;

        const { id, videoId, title } = video;
        const url = postUrl;
        const postedAt = moment().utc().format();
        const postObj = { id, videoId, postedAt, url, title };

        dispatch(setVideosRequesting());

        dispatch(setPostDetails(postObj, updated => {
            dispatch(getYoutubeVideos());
            dispatch(getPostCount());
            if (updated) navigate('/post');
        }));
    };

    return (
        <Container maxWidth="lg" className='selected-video'>
            <Grid container spacing={2}>
                <Grid item xs={8} className='item'>
                    <h3 onClick={() => copyText(video?.title)}>{video?.title} </h3>
                    <pre onClick={() => copyText(video?.description)}>{video?.description}</pre>
                </Grid>

                <Grid item xs={4} className='item'>
                    <img
                        onClick={() => copyText(video?.thumbnail)}
                        md={{ maxWidth: "400px", maxHeight: "200px" }}
                        sx={{ maxWidth: "200px", maxHeight: "100px" }}
                        style={{ maxWidth: "600px", maxHeight: "300px" }}
                        src={`${video?.thumbnail}?w=164&h=164&fit=crop&auto=format`}
                        alt="" />

                    {video?.tags.length > 0 ?
                        <>
                            {video?.tags.map(tag =>
                                <Chip
                                    sx={{ m: 0.2 }}
                                    label={tag}
                                    onClick={() => copyText(tag)} />)}
                            <div>
                                <Button variant='contained' sx={{ m: 2 }} onClick={() => copyText(video.tags)}>
                                    <ContentCopyIcon />Copy
                                </Button>
                            </div>

                        </>
                        :
                        <Alert sx={{ mt: 2, }}
                            severity="error"
                            icon={<SentimentDissatisfiedIcon fontSize="inherit" />}
                        >
                            No tags found
                        </Alert>}

                    <Box style={{ marginTop: '20px', width: '100%' }}>
                        <div>
                            <TextField value={postUrl} onChange={e => setPostUrl(e.target.value)} label="post URL" style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginTop: '15px' }}>
                            <Button variant='contained' disabled={postUrl.trim().length === 0} onClick={() => updatePostDetails()}>Update</Button>
                        </div>
                    </Box>
                </Grid>
            </Grid>

        </Container >
    );
};

export default VideoDetail;