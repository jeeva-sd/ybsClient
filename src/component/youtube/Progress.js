import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress color="inherit" thickness={1.5} variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.light">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export default function CircularStatic() {
    const videos = useSelector(state => state.youtube.videos.data);
    const postCount = useSelector(state => state.blog.data.postCount);

    const percentage = React.useMemo(() => {
        if (videos && videos.length > 0) return (postCount / videos.length) * 100;
        else return 0;
    }, [videos, postCount]);

    return <CircularProgressWithLabel value={percentage} />;
}
