import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import PostWidget from './PostWidget';

const PostsWidget = ({userId, isProfile= false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const res = await fetch(`http://localhost:5003/posts`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json()
    
        dispatch(setPosts({ posts: data }));
    }

    const getUserPosts = async () => {
        const res = await fetch(`http://localhost:5003/posts/${userId}/posts`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json()
    
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        }
        else {
            getPosts();
        }
    }, []); //eslint-disable-line

    return (
        <>
            {
                posts.map((post) => <PostWidget key={post._id} post={post}></PostWidget>)
            
            }
        </>
    )



};

export default PostsWidget;