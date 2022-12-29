import {
    ScrollView,
    View,
} from 'react-native';
import styled from 'styled-components/native';
import React, { useEffect, useState, useContext } from "react";

import { ThemeContext } from '../providers/ThemeProvider';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/colors';

export default function DetailsScreen ({route, navigation}){
  const { item } = route.params;
  const { isDark, colors } = useContext(ThemeContext);

  useEffect(()=>{
   navigation.setOptions({
    title: item.title,
    headerStyle:{
        backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout,
    },
    headerTintColor: isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor,
  })
  },[])

  return (
  <ScrollView style={{padding:20, backgroundColor: colors.layout}} >
  <PostImage
  source={{
    uri: item.imageUrl,
  }}/>
  <View style={{alignItems:'center'}}>
  <PostTitle isDark={isDark}>
    {item.title}</PostTitle>
  </View>
  <PostText isDark={isDark}>
    {item.text}</PostText>
  </ScrollView>
  )
}

const PostImage = styled.Image`
height: 250px;
width: 100%;
margin: 0px 0px 20px 0px;
border-radius: 10px;
`;
const PostText = styled.Text`
font-size: 16px;
font-weight: 500;
color: ${(props) => props.isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor};
`;
const PostTitle = styled.Text`
font-size: 16px;
font-weight: 700;
padding-bottom: 20;
color: ${(props) => props.isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor};
`;