import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AnalogClock from 'react-native-clock-analog';
import moment from 'moment-timezone';

const Index = () => {
    const [selectedTimeZone, setSelectedTimeZone] = useState('Asia/Kolkata');
    const [timeZones, setTimeZones] = useState([]);
    const [currentTime, setCurrentTime] = useState(moment().tz(selectedTimeZone));

    useEffect(() => {
        setTimeZones(moment.tz.names());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().tz(selectedTimeZone));
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedTimeZone]);

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            {/* <View style={styles.pickerContainer}>
                <View style={styles.pickerWrapper}>
                    <Picker
                        style={{ backgroundColor: '#fff', width: 200, height: 200 }}
                        selectedValue={selectedTimeZone}
                        onValueChange={(itemValue) => setSelectedTimeZone(itemValue)}
                    >
                        {timeZones.map((zone, index) => (
                            <Picker.Item key={index} label={`${zone} - ${moment().tz(zone).format('LTS')}`} value={zone} color={'#000'} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.currentTimeContainer}>
                <Text style={styles.currentTimeText}>
                    Current Time: {currentTime}
                </Text>
            </View> */}
            <View style={{ backgroundColor: '#f0280a', width: '95%', height: 200, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 10, marginTop: 10 }}>
                <View style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Picker
                        style={{ backgroundColor: '#000', color: '#fff', width: 170, height: 170 }}
                        selectedValue={selectedTimeZone}
                        onValueChange={(itemValue) => setSelectedTimeZone(itemValue)}
                    >
                        {timeZones.map((zone, index) => (
                            <Picker.Item key={index} label={`${zone} - ${moment().tz(zone).format('LTS')}`} value={zone} color={'#fff'} />
                        ))}
                    </Picker>
                </View>
                <View style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <AnalogClock
                        key={selectedTimeZone}
                        hours={currentTime.hours()}
                        minutes={currentTime.minutes()}
                        seconds={currentTime.seconds()}
                        colorClock="#2196F3"
                        colorNumber="#000000"
                        colorCenter="#00BCD4"
                        colorHour="#FF8F00"
                        colorMinutes="#FFC400"
                        autostart={true}
                        showSeconds
                    />
                </View>
            </View>
            <Text style={styles.currentTimeText}>
                Current Time: {currentTime.format('LTS')}
            </Text>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    pickerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerWrapper: {
        borderRadius: 100,
        overflow: 'hidden',
    },
    currentTimeContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    currentTimeText: {
        color: '#fff',
        fontSize: 20,
    },
})
