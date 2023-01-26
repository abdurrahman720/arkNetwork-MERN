import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setFriends } from '../state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const Friend = ({ friendId, name, subtitle, userPicturePath,userId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(userId)
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    console.log(friends)
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    // const [fetchFriends, setFetchFriends] = useState([]);

    const { data: fetchFriends = [] ,refetch} = useQuery({
        queryKey: ["fetchFriends"],
        queryFn:async () => {
            const res = await fetch(`http://localhost:5003/users/${userId}/friends`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            return data
        }
    })

    console.log(fetchFriends);


    // const getFriends = async () => {
    //     const res = await fetch(`http://localhost:5003/users/${_id}/friends`, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     });
    //     const data = await res.json();
    //     dispatch(setFriends({friends:data}))
    //     setFetchFriends(data)
    // }
    // useEffect(() => {
    //     getFriends()
    // },[]) //eslint-disable-line

  
    const isFriend = fetchFriends.find((friend) => friend._id === friendId);
  
    const patchFriend = async () => {
      const response = await fetch(
        `http://localhost:5003/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
        const data = await response.json();
        refetch()
        // dispatch(setFriends({ friends: data }));
        return data;
    };
  
    return (
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton
                onClick={() => patchFriend()
                }
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      </FlexBetween>
    );
  };
  
  export default Friend;