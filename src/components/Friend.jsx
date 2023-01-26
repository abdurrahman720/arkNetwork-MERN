import { useTheme } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

    const isFriend = friends.find((f) => f._id === friendId);

    const patchFriend =


    return (
        <div>
            
        </div>
    );
};

export default Friend;