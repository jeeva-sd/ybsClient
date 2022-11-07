import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { routes } from '../../constant/routes';
import { useSelector } from 'react-redux';
import { Avatar, Badge, LinearProgress } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircle from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window, children } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const user = useSelector(state => state.login.user);
    const publishedCount = useSelector(state => state.blog.data.publishedCount);
    const pendingCount = useSelector(state => state.blog.data.pendingCount);
    const isRequestingYoutubeVideos = useSelector(state => state.youtube.videos.isRequesting);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (obj) => {
        if (!obj && !obj.hasOwnProperty('path')) return;
        setMobileOpen(!mobileOpen);
        navigate(`/${obj.path}`);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {routes.map((obj, index) => (
                    <div key={index}>
                        {(index > 0 && (routes[index - 1].id !== routes[index].id)) && <Divider />}
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => handleMenu(obj)} style={{ backgroundColor: pathname.includes(obj.path) ? '#ebebeb' : 'inherit' }}>
                                <ListItemIcon>
                                    {<obj.icon />}
                                </ListItemIcon>
                                <ListItemText primary={obj.name} />
                            </ListItemButton>
                        </ListItem>
                    </div>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: '100%', ml: { sm: `${drawerWidth}px` } }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap component="div">
                        jee6.in
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => navigate('/post')}>
                            <Badge badgeContent={pendingCount} color="error">
                                <VideoLibraryIcon />
                            </Badge>
                        </IconButton>

                        <IconButton size="large" style={{ marginRight: '15px', marginLeft: '5px' }} aria-label="show 4 new mails" color="inherit" onClick={() => navigate('/published')}>
                            <Badge badgeContent={publishedCount} color="error">
                                <PublicIcon />
                            </Badge>
                        </IconButton>

                        {user && user.isLoggedIn ?
                            <Avatar alt="user" src={user.imageUrl} className='user-avatar' />
                            :
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={'menuId'}
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>}
                    </Box>
                </Toolbar>
                {isRequestingYoutubeVideos && <LinearProgress />}

            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 500 }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                style={{ backgroundColor: '#F9F9F9', overflowY: 'scroll', height: '100vh', minHeight: '100vh', scrollbarWidth: 'thin' }}
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default ResponsiveDrawer;