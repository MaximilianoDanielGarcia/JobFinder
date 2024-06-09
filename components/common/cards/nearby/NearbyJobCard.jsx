import React, { useEffect } from 'react'
import { View, Text, Image, Pressable } from 'react-native'

import styles from './nearbyjobcard.style'

const NearbyJobCard = ({ job, handleNavigate }) => {

  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
        <Pressable style={styles.logoContainer}>
            <Image 
              source={{uri: job.employer_logo}}
              resizeMode='contain'
              style={styles.logoImage}/>
        </Pressable>

        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>{job.job_title}</Text>
          <Text style={styles.jobType}>{job.job_employment_type}</Text>
        </View>
    </Pressable>
  )
}

export default NearbyJobCard