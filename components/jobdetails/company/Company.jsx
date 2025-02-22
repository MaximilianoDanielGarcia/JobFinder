import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './company.style'
import { icons } from '../../../constants'

const Company = ({ companyLogo, jobTitle, companyName, country, city }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image 
          source={{ uri: companyLogo }}
          style={styles.logoImage}/>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName}</Text>

        <View style={styles.locationBox}>
          <Image 
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}/>
            <Text style={styles.locationName}>{city}{city && country ? ', ' : ''}{country}</Text>
        </View>
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
    </View>
  )
}

export default Company