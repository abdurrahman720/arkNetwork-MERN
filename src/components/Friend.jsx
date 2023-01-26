import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends } from '../state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    
    const { palette } = useTheme();
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.friends);

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends?.find((f) => f._id === friendId);

    const patchFriend = async () => {
        const res = await fetch(`http://localhost:5003/users/${_id}/${friendId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        dispatch(setFriends({friends:data}))
    }


    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`profile/${friendId}`)
                        navigate(0)
                    }
                    }
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                        </Typography>
                </Box>
            </FlexBetween>
            <IconButton onClick={()=>patchFriend()} sx={{backgroundColor: primaryLight, p:"0.6rem"}} >
                {
                    isFriend ? (
                    <PersonRemoveOutlined sx={{color:primaryDark}} />
                    ) : (
                            <PersonAddOutlined sx={{color:primaryDark}} />
                    )
                        }
            </IconButton>
       </FlexBetween>
    );
};

export default Friend;