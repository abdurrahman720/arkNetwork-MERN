import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PostsWidget = ({userId, isProfile= false}) => {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token)
};

export default PostsWidget;