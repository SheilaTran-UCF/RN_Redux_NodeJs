import {useNavigation, CommonActions, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
// import {styles} from './styles';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {unwrapResult} from '@reduxjs/toolkit';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../config';
import {RoutesName} from '../../navigation';
import {
  createWorkAsyncThunk,
  updateWorkAsyncThunk,
} from '../../store/authSlice';

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: 'gray',
    borderBottomWidth: moderateScale(2),
    paddingVertical: moderateScale(10),
    marginTop: moderateScale(35),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  plusButton: {
    position: 'absolute',
    left: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3DEE8',
    fontSize: moderateScale(16),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    color: '#4F4F4F',
    marginHorizontal: moderateScale(18),
    height: moderateScale(48),
    marginBottom: moderateScale(18),
    marginTop: moderateScale(20),
  },
  input1: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3DEE8',
    fontSize: moderateScale(16),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    color: '#4F4F4F',
    marginHorizontal: moderateScale(18),
    height: moderateScale(48),
  },
  touchableOpacity: {
    backgroundColor: '#025DD7',

    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(8),
    alignItems: 'center',
    height: moderateScale(48),
    justifyContent: 'center',
    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(24),
  },
  text: {
    color: '#ffffff',
  },
});

const Work = () => {
  const dispatch = useDispatch();

  const router = useRoute();
  const {workData} = router?.params;

  const navigation = useNavigation();
  const [title, setTitle] = React.useState('');
  const [describe, setDescribe] = React.useState('');

  const handleSubmit = async () => {
    if (workData) {
      const actionResult = await dispatch(
        updateWorkAsyncThunk({
          id: workData._id,
          title: title,
          describe: describe,
        }),
      );
      const unwrapResultData = unwrapResult(actionResult);

      if (unwrapResultData.status === 200) {
        Alert.alert('Update success!');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Home'}],
          }),
        );
      }
    } else {
      const actionResult = await dispatch(
        createWorkAsyncThunk({
          title: title,
          describe: describe,
        }),
      );
      const unwrapResultData = unwrapResult(actionResult);

      if (unwrapResultData.status === 200) {
        Alert.alert('Create success!');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Home'}],
          }),
        );
      }
    }
  };

  useEffect(() => {
    if (workData) {
      setTitle(workData.title);
      setDescribe(workData.describe);
    }
  }, [workData]);

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text>Work</Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            navigation.navigate(RoutesName.Home1);
          }}>
          <AntDesign name="arrowleft" style={{color: 'red', fontSize: 24}} />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={value => {
            setTitle(value);
          }}
          placeholder="Title"
          value={title}
        />

        {/* input describe */}
        <TextInput
          style={styles.input1}
          onChangeText={value => {
            setDescribe(value);
          }}
          placeholder="Describe"
          value={describe}
        />

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={handleSubmit}>
          <Text style={styles.text}>
            {workData ? 'Update Work' : 'Create Work'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Work;
