import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PostWidget = ({ post }) => {
    const { _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments } = post;

    const [isComment, setIsComment] = useState(false);
    const loggedInUserId = useSelector((state) => state.user._id) //currently logged in user 
    const isLiked = Boolean(likes[loggedInUserId]); // we need to check if this user already liked it or not
    const likedCount = Object.keys(likes).length; // likes is not an array rather a map

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);


    const { palette } = useTheme();
    const primary = palette.primary.main;
    const main = palette.neutral.main;

    const patchLike = async () => {
        const res = await fetch(`http://localhost:5003/posts/${_id}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({userId: loggedInUserId})
        })
    }
    
    return (
        <div>
            
        </div>
    );
};

export default PostWidget;