import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPost } from "../../state";

const PostWidget = ({ post }) => {
  const {
    _id,
    userId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  } = post;

  const [isComment, setIsComment] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id); //currently logged in user
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
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={userId}
        subtitle={location}
        userPicturePath={userPicturePath}
        name={`${firstName} ${lastName}`}
        userId={userId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          src={`http://localhost:5003/assets/${picturePath}`}
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likedCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
          </FlexBetween>
          {isComment && (
              <Box mt="0.5rem">
                  {comments.map((comment, i) => (
                      <Box key={`${firstName} ${lastName}-${i}`}>
                          <Divider />
                          <Typography sx={{color:main, m: "0.5rem 0", pl:"1rem"}}>
                              {comment}
                          </Typography>
                      </Box>
                  ))}
                  <Divider/>
              </Box>
          )}
    </WidgetWrapper>
  );
};

export default PostWidget;
