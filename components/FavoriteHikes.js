import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Text,
    Button,
    TextInput,
    Modal,
} from 'react-native';
import styles from '../constants/MainStyles';

export default function FavoriteHikes(props) {

    return (
            <ScrollView style={styles.hikesContainer}>
                {props.userState.hikes && props.userState.hikes.length !== 0 ? props.userState.hikes.slice().reverse().map((hike, i) => {
                    return (
                        <View style={styles.hikeContainer} key={i}>
                            <Image source={{ uri: hike.photo }} style={{ width: '100%', height: 200 }} />
                            <View style={styles.hikeTag}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('Hike', { hike: hike })}>
                                    <Text style={styles.title}>
                                        {hike.name}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.section}>
                                    Length: {hike.length}
                                </Text>
                                <Text style={styles.section}>
                                    {hike.location}
                                </Text>
                            </View>
                        </View>
                    )
                }) : <Text style={{ textAlign: 'center' }}>No favorites yet.</Text>}

            </ScrollView>
    )
}