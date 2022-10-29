import React from 'react';
import AddPost from './AddPost';
import VideoCard from './VideoCard';

const Layout = () => {
    return (
        <div className='youtube-home' >
            <AddPost />
            <VideoCard />
        </div>
    );
};

export default Layout;