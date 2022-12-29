import { View, Text, StyleSheet,TextInput, TouchableWithoutFeedback} from "react-native";
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useContext } from "react";

import { ThemeContext } from '../providers/ThemeProvider';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/colors';

export default function SearchInput ({onChange, search, handleChangeColorTheme}) {

  const { isDark, colors } = useContext(ThemeContext);
    return(
          <Container isDark={isDark}>
            <SearchView isDark={isDark}>
                <InputTextCustom
                isDark={isDark}
                // style={styles.basicText}
                value={search}
                onChangeText={onChange}
                placeholder={'поиск...'}
                placeholderTextColor={isDark ? DARK_COLORS.placeholderTextColor : LIGHT_COLORS.placeholderTextColor}
                selectionColor={isDark ? DARK_COLORS.selectionColor : LIGHT_COLORS.selectionColor}
                autoCorrect={false}  //отключение т9
                multiline={true}  //работа enter
                keyboardType={'default'}
                keyboardAppearance={'dark'}
                />
            </SearchView>
            <TouchableWithoutFeedback
            isDark={isDark}
            onPress={handleChangeColorTheme}>
            <ModeView>
               {!isDark
               ?<Icon name="moon-outline"
               size={30}
               color="#1C1F25" />
                :<Icon name="moon"
                size={30}
                color="#ffffff" />
               }
            </ModeView>
            </TouchableWithoutFeedback>
            </Container>
    );
};

const Container = styled.View`
background-color: ${(props) =>
  props.isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout};
  flex-direction: row;
  align-items:center;
  `;

  const InputTextCustom = styled.TextInput`
    padding-top: 15px;
    padding-bottom: 15px;
    color: ${(props) => props.isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor};
    font-size: 14px;
    margin:0px 10px 0px 10px;
    `;

  const ModeView = styled.View`
  // margin-left: auto;
  margin: 0px 20px 10px 0px;
  // background-color: #000000;
  `;

  const SearchView = styled.View`
  flex: 1;
  wight: 100%;
  justify-content: center;
  margin: 0px 20px 10px 20px;
  border-radius: 7px;
  border-width: 1px;
  border-color:${(props) =>
    props.isDark ? DARK_COLORS.borderColor : LIGHT_COLORS.borderColor};
  // flex-direction: row;
  `;