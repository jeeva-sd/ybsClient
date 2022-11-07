import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export const routes = [
    {
        name: 'Home',
        path: 'home',
        exactPath: true,
        id: 'home',
        icon: HomeIcon
    },
    {
        name: 'Add Post',
        path: 'add',
        exactPath: false,
        id: 0,
        icon: PostAddIcon
    },
    {
        name: 'Pending',
        path: 'post',
        exactPath: false,
        id: 1,
        icon: DynamicFeedIcon
    },
    {
        name: 'Published',
        path: 'published',
        exactPath: false,
        id: 1,
        icon: CloudDoneIcon
    },
    {
        name: 'Trending',
        path: 'trending',
        exactPath: false,
        id: 1,
        icon: WhatshotIcon
    }
];