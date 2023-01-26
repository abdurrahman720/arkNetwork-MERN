import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import AdvertWidget from '../widgets/AdvertWidget';
import FriendListWidget from '../widgets/FriendListWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import UserWidgets from '../widgets/UserWidgets';

const HomePage = () => {
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    
    return (
        <Box>
            <Navbar></Navbar>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                    <UserWidgets userId={_id} picturePath={picturePath}></UserWidgets>
                </Box>
                <Box
                    flexBasis={isNonMobileScreen ? "42%" : undefined}
                    mt={isNonMobileScreen ? undefined: "2rem"}
                >
                    <MyPostWidget picturePath={picturePath}></MyPostWidget>
                    <PostsWidget userId={_id}></PostsWidget>
                </Box>
                {isNonMobileScreen && <Box flexBasis="26%">
                    <AdvertWidget />
                    <Box m="2rem 0">
                        <FriendListWidget userId={_id}/>
                    </Box>
                </Box>}
            </Box>
        </Box>
    );
};

export default HomePage;