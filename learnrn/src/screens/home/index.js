import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

import {styles} from './styles';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {moderateScale} from '../../config';
import {
  deleteWorkAsyncThunk,
  getWorkAsyncThunk,
  resetAuth,
} from '../../store/authSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {RoutesName} from '../../navigation';
// import {getWorkAsyncThunk, deleteWorkAsyncThunk} from '../../store/authSlice';
import {useShallowEqualSelector} from '../../store/selector';
import {unwrapResult} from '@reduxjs/toolkit';

export default function HomeScreen() {
  const {works} = useShallowEqualSelector(state => ({
    works: state.me.works,
  }));
  const dispatch = useDispatch();

  const navigation = useNavigation();

  //?
  const handleUpdateWork = async work => {
    console.log(work);
    navigation.navigate('Work', {
      workData: work,
    });
  };

  const handleDeleteWork = async id => {
    const actionResults = await dispatch(deleteWorkAsyncThunk(id));

    const unwrapResultData = unwrapResult(actionResults);

    if (unwrapResultData.status === 200) {
      Alert.alert('delete sucess');
    }
  };

  const handleLogout = () => {
    dispatch(resetAuth());
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Login'}],
      }),
    );
  };

  useEffect(() => {
    dispatch(getWorkAsyncThunk());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Home</Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            navigation.navigate(RoutesName.Work, {workData: null});
          }}>
          <AntDesign name="plus" style={{color: 'red', fontSize: 24}} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.touchableOpacity} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>

      <ScrollView>
        {works.map((work, index) => (
          <View style={styles.listContainer} key={index}>
            <View>
              <Text style={styles.itemTitle}>{work.title}</Text>
              {/* work :element -> call data co trong element */}
              <Text style={styles.itemDescriber}>{work.describe}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteWork(work._id);
                }}>
                <AntDesign name="delete" color="red" size={20}></AntDesign>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  //? work
                  handleUpdateWork(work);
                }}
                style={{marginTop: 10}}>
                <Feather name="edit" color="red" size={20}></Feather>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
