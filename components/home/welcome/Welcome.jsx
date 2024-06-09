import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants';

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {

  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
          <Text style={styles.userName}>Hola Max</Text>
          <Text style={styles.welcomeMessage}>Encontrá el trabajo ideal</Text>
      </View>
      <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
              <TextInput 
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={(text) => {setSearchTerm(text)}}
                placeholder='¿Qué estás buscando?'/>
          </View>
          <Pressable style={styles.searchBtn} onPress={handleClick}>
              <Image 
                source={icons.search}
                resizeMode='contain'
                style={styles.searchBtnImage}/>
          </Pressable>
      </View>

      <View style={styles.tabsContainer}>
          <FlatList 
            data={jobTypes} 
            keyExtractor={item => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
            renderItem={({item}) => (
            <Pressable 
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}>
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </Pressable>
          )}/>
      </View>
    </View>
  )
}

export default Welcome