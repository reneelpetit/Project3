import * as WebBrowser from 'expo-web-browser';
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
import CommentsBox from '../components/CommentsBox';
import CommentModal from '../components/CommentModal';
import { NavigationActions } from 'react-navigation';
import Map from '../components/Map';


export default function HikeScreen(props) {

    // props to be passed in:
    // name
    // photo
    // length
    // summary
    // comments
    // ****eventually location?

    const [hike, setHike] = useState(props.navigation.getParam('hike',{}));
    const [modalVisibleState, setModalVisibleState] = useState(false);
    const [commentState, setCommentState] = useState('');
    const isPastInitialRender = useRef(false);
    const [ProfileKey, setProfileKey] = useState('');

    useEffect(() => {
          console.log('***');
          console.log(ProfileKey);
          console.log('***');
          const setParamsAction = NavigationActions.setParams({
            params: { value: Math.random() },
            key: ProfileKey,
          });
          props.navigation.dispatch(setParamsAction);
    }, [ProfileKey])

    const _retrieveKey = async () => {
      try {
        const key = await AsyncStorage.getItem('ProfileKey');
        if (key !== null) {
          setProfileKey(key);
          return;
        }
        else {
          console.log('No async storage for "ProfileKey"');
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    };

    const addHikeToFavorites = async (hikeId) => {
      const userId = await AsyncStorage.getItem('id');
      fetch(`https://stump-around.herokuapp.com/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ hikeId, userId }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          // setHike(responseJson);
          console.log('res2', responseJson);
          alert('Added to favorites');
          _retrieveKey();
        }
      )
      .catch((error) => {
        console.error(error);
        alert('Add failed');
      });
    }


    useEffect(() => {_updateHike();}, []);

    const commentPOST = async (data) => {
      const userId = await AsyncStorage.getItem('id');
      const newData = { ...data, user: userId };
      // console.log(newData);
      fetch(`https://stump-around.herokuapp.com/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(newData),
        })
        .then((response) => response.json())
        .then((responseJson) => console.log('responseJson'))
        .catch((error) => {
          console.error(error);
        });
    };

    const _updateHike = () => {
      isPastInitialRender.current = true;
      // console.log('id', hike._id);
      fetch(`https://stump-around.herokuapp.com/hike/${hike._id}`, {
          method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setHike(responseJson);
            // console.log('res1', responseJson);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <View style={styles.container}>
          <CommentModal setModalVisibleState={setModalVisibleState} modalVisibleState={modalVisibleState} setCommentState={setCommentState} commentState={commentState} commentPOST={commentPOST} _updateHike={_updateHike} hike={hike} />

            <ScrollView
            keyboardShouldPersistTaps='never'
            style={styles.hikePageBody}
            contentContainerStyle={styles.hikePageContentContainer}>
                {/* eventually source will be props.photo */}
                <Image source={{ uri: hike.photo }} style={{width: '100%', height: 300, resizeMode: 'cover'}} />
                <Text style={styles.hikeTitle}>
                    {hike.name}
                </Text>
                <Text style={styles.hikeLength}>
                    Length: {hike.length}
                </Text>
                <Button title="Add to favorites" onPress={() => {addHikeToFavorites(hike._id)}} color="blue" />
                <Text style={styles.summary}>
                    {hike.summary}
                </Text>
                <CommentsBox isPastInitialRender={isPastInitialRender} hike={hike} navigation={props.navigation} setModalVisibleState={setModalVisibleState} />
                <Map name={hike.name} summary={hike.summary} latitude={hike.latitude} longitude={hike.longitude} />
            </ScrollView>
        </View>
    );
}

HikeScreen.navigationOptions = {
  header: null,
};


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   hikePageBody: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   hikePageContentContainer: {
//     paddingTop: 20,
//     justifyContent: 'space-between'
//   },
//   hikeTitle: {
//     padding: 10,
//     fontSize: 30,
//     textAlign: 'center',
//   },
//   hikeLength: {
//     textAlign: 'center',
//   },
//   summary: {
//       marginRight: '15%',
//       marginLeft: '15%',
//   },
//   commentsContainer: {
//     padding: 20,
//     paddingTop: 0,
//     paddingBottom: 0,
//     margin: 20,
//     borderColor: 'black',
//     borderWidth: 0.5,
//     borderRadius: 5,
//   },
//   comment: {
//     padding: 5,
//     borderColor: 'black',
//     borderWidth: 0.5,
//     borderRadius: 3,
//   },
//   commentHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//     borderBottomColor: 'black',
//     borderBottomWidth: 0.5,
//   },
//   commentBody: {
//     padding: 2,
//   },
//   commentsTitle: {
//     textAlign: 'center',
//     padding: 10,
//     fontSize: 20,
//   },
//   commentPhoto: {
//     marginRight: 5,
//     marginBottom: 5,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//   },
//   userLink: {
//     color: 'green',
//   },
//   commentButton: {
//     margin: 20,
//   },
//   commentDate: {
//     fontSize: 10,
//   }
// });
