
import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Switch,
} from 'react-native';
import styled from 'styled-components/native';
import Post from '../components/Post';
import axios from 'axios';
import DetailsScreen from '../screens/DetailsScreen';
import SearchInput from '../components/SearchInput';

import { ThemeContext } from '../providers/ThemeProvider';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/colors';

export default function HomeScreen ({navigation}){
    const [items, setItems]= useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading]= useState(true);
    const [value, setValue] = useState('');
    const [theme, setTheme] = useState(false);

    const { colors, isDark, setColorScheme } = useContext(ThemeContext);
    const handleChangeColorTheme = () => {
          setTheme(!theme);
          setColorScheme(theme ? 'dark' : 'light');
      }

  const fetchPosts = ()=>{
    setIsLoading(true);
      axios
      .get('https://639cc70a42e3ad69273beed0.mockapi.io/posts')
      .then(( {data} )=>{
        setItems(data)
        setFilteredItems(data)
        setValue('')
      }).catch((err)=>{
        console.log(err)
        alert('Ошибка при получении статей!')
      }).finally(()=>{
        setIsLoading(false)
      })
   }
  useEffect(fetchPosts,[])

  if(isLoading){
    return <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout,
    }}>
      <ActivityIndicator
      size="large"
      color={isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor}/>
      <Text style={{
        marginTop:20,
        fontSize: 20,
        fontWeight:'400',
        color:isDark ? DARK_COLORS.textColor : LIGHT_COLORS.textColor,
        }}>
          Загрузка...</Text>
    </View>
  }

  const createFilteredList = (e)=>{
    // setValue(e);
    const createFilteredList = (text)=>{
        if(text){
            const newData = items.filter(itemOfList=>{
                const itemData = itemOfList.title
                        ?  itemOfList.title.toUpperCase()
                        : ''.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            // const newData =  items.filter(itemOfList => {
            //     return itemOfList.title.toLowerCase().includes(value.toLowerCase())
            // })
            setFilteredItems(newData);
            setValue(text);
        } else {
            setFilteredItems(items);
            setValue(text);
        }
    }
    createFilteredList(e);
  }

  return (
    <SafeAreaViewCustom isDark={isDark}>
    <SearchInput search={value}
    onChange={createFilteredList}
    handleChangeColorTheme={handleChangeColorTheme}
    />
      <FlatList
      refreshControl={
      <RefreshControl
      refreshing={isLoading}
      onRefresh={fetchPosts}
      />}
      data={filteredItems}
      renderItem={({item})=>
      <TouchableOpacity
      onPress={() => navigation.navigate('Details',{item: item})}>
        <Post
        title={item.title}
        imageUrl={item.imageUrl}
        createDate={item.createDate}/>
        </TouchableOpacity>
      }/>
    </SafeAreaViewCustom>
  );
}
const SafeAreaViewCustom = styled.SafeAreaView`
    background-color: ${(props) =>
    props.isDark ? DARK_COLORS.layout : LIGHT_COLORS.layout};
    flex:1;
`;