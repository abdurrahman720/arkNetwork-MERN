import { useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import setPosts from '../../state';

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    const mediumMain = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath",image.name)
        }
        const response = await fetch(`http://localhost:5003/posts`,{
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        }
        )
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setPost("");
    }

    return (
        <div>
            
        </div>
    );
};

export default MyPostWidget;