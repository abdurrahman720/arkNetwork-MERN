import { Typography, useTheme,Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { setFriends } from '../../state';

const FriendListWidget = ({ userId }) => {
    console.log(userId);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token)
    const { palette } = useTheme();
    // const friends = useSelector((state) => state.user?.friends);
    // console.log(friends);
    // const [fetchFriends, setFetchFriends] = useState([]);

    const { data: fetchFriends = [], refetch } = useQuery({
        queryKey: ["fetchFriends"],
        queryFn:async () => {
            const res = await fetch(`http://localhost:5003/users/${userId}/friends`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            dispatch(setFriends({friends:data}))
            return data
        }
    })
   
    console.log({frnds: fetchFriends})


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
                    fetchFriends?.map((friend) =>
                        <Friend key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.location}
                            userPicturePath={friend.picturePath}
                            fetchFriends={fetchFriends}
                            refetch={refetch}
                            userId={userId}
                        ></Friend>
                    )
                }
            </Box>
       </WidgetWrapper>
    );
};

export default FriendListWidget;