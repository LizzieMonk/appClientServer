import styled from 'styled-components/native';
import React, { useEffect, useState, useContext } from "react";

import { ThemeContext } from '../providers/ThemeProvider';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/colors';

const cutTitle = (str)=>{
    if(str.length>=70){
        return str.substring(0,50)+'...';
    } else return str;
}

export default function Post ({title, imageUrl, createDate}) {
    // const { isDark } = useContext(ThemeContext)

const { isDark } = useContext (ThemeContext);
    return <PostView isDark={isDark}>
    <PostImage
    source={{uri: imageUrl}}/>
    <PostDetails>
      <PostTitle isDark={isDark}>
        {cutTitle(title)}</PostTitle>
      <PostDate isDark={isDark}>
        {new Date(createDate).toLocaleDateString()}</PostDate>
    </PostDetails>
  </PostView>
}

const PostView = styled.View`
 margin: 0px 20px 10px 20px;
//  height: 70px;
 border-radius: 5px;
 border-width: 1px;
 border-color: ${(props) =>
  props.isDark ? DARK_COLORS.borderColor : LIGHT_COLORS.borderColor};
 flex-direction: row;
//  align-items:center;
 `;
 const PostImage = styled.Image`
  height: 55px;
  width: 55px;
  margin: 10px 10px 10px 10px;
  border-radius: 3px;
  `;
 const PostTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.isDark ? DARK_COLORS.textColor: LIGHT_COLORS.textColor};
  `;
 const PostDetails = styled.View`
    margin:5px 10px 5px 10px;
    flex: 1;
  `;
 const PostDate = styled.Text`
  font-size: 12px;
  color: ${(props) =>
    props.isDark ? DARK_COLORS.textDate: LIGHT_COLORS.textDate};
  padding-top: 5px;
  `;


