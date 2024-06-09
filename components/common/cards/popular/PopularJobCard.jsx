import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'

import styles from './popularjobcard.style'

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {

  return (
    <Pressable 
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}>

        <Pressable style={styles.logoContainer(selectedJob, item)}>
            <Image 
              source={{uri: item.employer_logo}}
              resizeMode='contain'
              style={styles.logoImage}/>
        </Pressable>
        <Text style={styles.companyName} numberOfLines={1}>{item.employer_name}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>{item.job_title}</Text>
          <Text style={styles.location}>{item.job_city}{item.job_city && item.job_country ? ' - ' : ''}{item.job_country}</Text>
        </View>
    </Pressable>
  )
}

export default PopularJobCard