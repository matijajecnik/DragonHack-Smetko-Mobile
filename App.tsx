import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import {
    Button,
    IconButton
} from 'react-native-paper';
import { supabase } from './lib/supabase';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [points, setPoints] = React.useState(null);
    const [currPoint, setCurr] = React.useState(null);
    const [currCount, setCount] = React.useState(null);

    React.useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            await supabase
                .from('Smetnjaki')
                .select('*')
                .then((res) => {
                    setPoints(res.data);
                });
        })();
    }, []);
    
    const refresh = async () => {
        await supabase
            .from('Smetnjaki')
            .select('*')
            .then((res) => {
                setPoints(res.data);
            });
    }

    const add = async (id) => {
        await supabase
            .from('Smetnjaki')
            .select('*')
            .eq('id', id)
            .then(async (res) => {
                await supabase .from('Smetnjaki')
                    .update({ full_count: res.data[0].full_count + 1 })
                    .eq('id', id)
            }
            );
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    
    return (
        <View>
            <MapView style={styles.map}
                showsUserLocation={ true }
                initialRegion={{
                    latitude: 46.047118,
                    longitude: 14.462141,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                onPress={() => styles.gradient.height = '0'}
            >

            {points && points.map(point => 
                <Marker 
                    key={point.id}
                    title={point.name}
                    coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                    onPress={() => setCurr(point)}
                >
                <View style={{backgroundColor: '#00a152', width: 20, height: 20, borderRadius: 20}}></View>
                <Callout tooltip={false}>
                </Callout>
                </Marker>
            )}

            </MapView>

            { currPoint != null && <LinearGradient
                colors={[
                    'rgba(255, 255, 255, 0)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)'
                ]}
                style={ styles.gradient }>
                

                <View style={ styles.container }>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{currPoint != null ? currPoint.name : ""}</Text>
                    <Button style={styles.button} mode='contained' onPress={ () => add(currPoint.id) }>Sporoči poln koš za smeti</Button>
                </View>
            </LinearGradient>
            }
            <IconButton style={ styles.refresh } icon="cached" size={40} mode='contained' iconColor='white' containerColor='green' onPress={ refresh }/>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        width: '100%',
        height: '30%',
        bottom: 0,
        position: 'absolute',
    },
    container: {
        width: '100%',
        height: '60%',
        bottom: 0,
        position: 'absolute',
    },
    button: {
        width: '70%',
        marginTop: '5%',
        borderRadius: 10,
        backgroundColor: 'green',
        alignSelf: 'center',
    },
    refresh: {
        position: 'absolute',
        top: 40,
        left: 20
    }
});