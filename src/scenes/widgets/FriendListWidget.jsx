import { Typography, useTheme,Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { setFriends } from '../../state';

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token)
    const { palette } = useTheme();
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        const res = await fetch(`http://localhost:5003/users/${userId}/friends`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        dispatch(setFriends({friends:data}))
    }
    useEffect(() => {
        getFriends()
    },[]) //eslint-disable-line

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{mb: "1.5rem"}}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {
                    friends.map((friend) =>
                        <Friend key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.location}
                            userPicturePath={friend.picturePath}
                        ></Friend>
                    )
                }
            </Box>
       </WidgetWrapper>
    );
};

export default FriendListWidget;