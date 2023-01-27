import { Typography, useTheme,Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { setFriends } from '../../state';

const FriendListWidget = ({ userId }) => {
  
    // const friends = useSelector((state) => state.user?.friends);
    // console.log(friends);
    // const [fetchFriends, setFetchFriends] = useState([]);

    // const { data: fetchFriends = [], refetch } = useQuery({
    //     queryKey: ["fetchFriends"],
    //     queryFn:async () => {
    //         const res = await fetch(`http://localhost:5003/users/${userId}/friends`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         const data = await res.json();
    //         dispatch(setFriends({friends:data}))
    //         return data
    //     }
    // })
   
    // console.log({frnds: fetchFriends})
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    
  
    const getFriends = async () => {
      const response = await fetch(
        `http://localhost:5003/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        const data = await response.json();
        console.log(data)
      dispatch(setFriends({ friends: data }));
    };
  
    useEffect(() => {
      getFriends();
    }, []);

    const friends = useSelector((state) => state?.user?.friends);
    console.log(friends)


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
                    friends?.map((friend) =>
                        <Friend key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.location}
                            userPicturePath={friend.picturePath}
                           
                            userId={userId}
                        ></Friend>
                    )
                }
            </Box>
       </WidgetWrapper>
    );
};

export default FriendListWidget;