import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { useFetch } from '../../../hooks/useFetch';

const Popularjobs = () => {

  const router = useRouter();
  const { data, error, isLoading } = useFetch('search', {
    query: 'React developer',
    num_pages: 1
  });

  const [selectedJob, setSelectedJob] = useState(null);

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle }>Los más relevantes</Text>
        <TouchableOpacity>
            <Text style={styles.headerBtn}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : error ? (
          <Text>Ups, algo salió mal.</Text>
        ) : (
          <FlatList 
            data={data} 
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
            renderItem={({ item }) => (
            <PopularJobCard 
              key={item.job_id} 
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress} />
          )}/>
        )}
      </View>
    </View>
  )
}

export default Popularjobs