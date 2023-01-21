import { EditOutlined, LocationOnOutlined, ManageAccountsOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import WidgetWrapper from '../../components/WidgetWrapper';
import twitter from '../../assets/twitter.png'
import linkedIn from '../../assets/linkedin.png'


const UserWidgets = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:5003/users/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUser(data)
    }
    useEffect(() => {
            getUser()
        },[])

    if (!user) {
        return null;
    }
    const {
        firstName, lastName, location, occupation, viewedProfile, impressions, friends
    } = user;

    return (
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={()=>navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath}/>
                    <Box>
                        <Typography variant="h4" color={dark} fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                            }
                        }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                 
                </FlexBetween>
                <ManageAccountsOutlined/>
                </FlexBetween>
                <Divider />
                {/* second row */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize='large' sx={{ color: main }} />
                        <Typography color={medium}>
                            {location}
                        </Typography>
                        </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
                        <Typography color={medium}>
                            {occupation}
                        </Typography>
                        </Box>
            </Box>
            <Divider />
                {/* third row */}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>
                            Who's viewed your Profile?
                        </Typography>
                        <Typography color={main} fontWeight="500">
                           {viewedProfile}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween>
                    <Typography color={medium}>
                           Impressions on your post
                        </Typography>
                        <Typography color={main} fontWeight="500">
                           {impressions}
                        </Typography>
                    </FlexBetween>
                </Box>
                <Divider />
                {/* fourth row */}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        Social Profiles
                    </Typography>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src={twitter} alt="social" />
                            <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                           </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}}/>
                    </FlexBetween>

                    <FlexBetween gap="1rem" >
                        <FlexBetween gap="1rem">
                            <img src={linkedIn} alt="social" />
                            <Box>
                            <Typography color={main} fontWeight="500">
                                Linked In
                            </Typography>
                            <Typography color={medium}>
                                NetWork Platform
                            </Typography>
                           </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}}/>
                    </FlexBetween>
                </Box>
        
        </WidgetWrapper>
    )
};

export default UserWidgets;