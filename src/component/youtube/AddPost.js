import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert, Box, Button, Container, Grid, Slide, Snackbar } from '@mui/material';
import { addPost } from '../../api';
import { setPostDetails } from '../../action/blog';
import { getContent } from '../../assets/blogTemplate/template';

export default function SimpleAccordion() {
    const accessToken = useSelector(state => state.login.user.accessToken);
    const videos = useSelector(state => state.youtube.videos.data);
    const posts = useSelector(state => state.blog.data.post);

    const dispatch = useDispatch();

    const [alert, setAlert] = React.useState({
        show: false,
        text: ''
    });

    const TransitionLeft = (props) => <Slide {...props} direction="left" />;

    const handlePost = (url) => window.open(url);

    const handleUpload = async () => {
        let index = 0;
        for (const video of videos) {
            index = index + 1;

            if (index < 10) {
                const content = await getContent(video);
                const post = await addPost(accessToken, content, video.title);

                if (post.hasOwnProperty('url')) {
                    const url = post.url;
                    const { id, videoId, title } = video;
                    const postedAt = moment().utc().format();
                    const postObj = { id, videoId, postedAt, url, title };

                    dispatch(setPostDetails(postObj));
                } else if (post.hasOwnProperty('error')) {
                    setAlert({
                        ...alert,
                        show: true,
                        text: post.error.message
                    });
                    break;
                }
            }
        }
    };

    return (
        <Container className='add-post'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <h3>Add Post</h3>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className='begin-button' variant="contained" onClick={handleUpload}>Begin Upload</Button>
                        </Grid>
                    </Grid>
                </AccordionSummary>

                <AccordionDetails>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {posts && posts.length > 0 ?
                                    <div>{posts.map((post, index) => <div className='posts' onClick={() => handlePost(post.url)} key={index}>{index + 1}) {post.title}</div>)}</div> : <div>No videos posted yet.</div>}
                            </Grid>
                        </Grid>
                    </Box>


                </AccordionDetails>
            </Accordion>

            {alert &&
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={alert.show}
                    autoHideDuration={10000}
                    onClose={() => setAlert(false)}
                    TransitionComponent={TransitionLeft}
                >
                    <Alert onClose={() => setAlert(false)} severity="error" sx={{ width: '100%' }}>
                        We're sorry, but one or more limits for the requested action have been exceeded.
                    </Alert>
                </Snackbar>}
        </Container >
    );
}
