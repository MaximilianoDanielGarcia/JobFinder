import React from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import { useFetch } from '../../hooks/useFetch';

const JobDetails = () => {

    const tabs = ["Acerca de", "Cualidades", "Responsabilidades"];
    const params = useLocalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    });

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])

    const displayTabContent = () => {
        switch (activeTab) {
            case 'Acerca de':
                return <JobAbout info={data[0].job_description ?? 'Sin descripción.'} />
                break;
            case 'Cualidades':
                return <Specifics title="Cualidades" points={data[0].job_highlights?.Qualifications ?? ['N/A']} />
                break;
            case 'Responsabilidades':
                return <Specifics title="Responsabilidades" points={data[0].job_highlights?.Responsibilities ?? ['N/A']} />
                break;
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerTitle: ' ',
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension={'60%'}
                        handlePress={() => router.back()} />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension={'60%'} />
                )
            }} />

            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={COLORS.primary} />
                    ) : error ? (
                        <Text>Ups, algo salió mal...</Text>
                    ) : data.length === 0 ? (
                        <Text>No se encontraron resultados.</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                country={data[0].job_country}
                                city={data[0].job_city} />

                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>

                <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
            </>
        </SafeAreaView>
    )
}

export default JobDetails