import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
    Provider,
    Button
} from 'react-native-paper';
import { supabase } from './lib/supabase';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default function App() {
    
    const add_smth = async () => {
        let { data, error } = await supabase.from('Smetnjaki').insert([{
            name: 'Smetnjak 1',
            latitude: 46.056946,
            longitude: 14.505751,
            full_count: 1,
        }]);
        if (error) {
            console.log(error);
        }
    }
    return (
        <View>
            <MapView style={styles.container}
                initialRegion={{
                    latitude: 46.047118,
                    longitude: 14.462141,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
