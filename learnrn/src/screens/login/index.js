import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {unwrapResult} from '@reduxjs/toolkit';
import {styles} from './styles';

// import {login} from '../../api/auth-api';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Images from '../../assets/images';
import {getWidth, moderateScale} from '../../config';
import {RoutesName} from '../../navigation';
import {loginAsyncThunk} from '../../store/authSlice';
import {useShallowEqualSelector} from '../../store/selector';

export default function LoginScreen() {
  const navigation = useNavigation();
  const router = useRoute();
  const {userId} = useShallowEqualSelector(state => ({
    userId: state.me.userId,
  }));
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async () => {
    const actionResults = await dispatch(
      loginAsyncThunk({email: email, password: password}),
    );
    console.log({actionResults});

    const unwrapResultData = unwrapResult(actionResults);
    console.log({unwrapResultData});
    if (unwrapResultData.status === 200) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}],
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={Images.logo} />
      <View style={styles.body}>
        {/* tai khoan */}
        <TextInput
          style={styles.input}
          onChangeText={value => {
            setEmail(value);
          }}
          placeholder="Tai khoan"
          value={email}
          autoCapitalize={false}
        />

        {/* password */}
        <TextInput
          style={styles.input1}
          onChangeText={val => {
            setPassword(val);
          }}
          placeholder="Mat khau"
          autoCapitalize={false}
        />

        {/* dang nhap */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.touchableOpacity}>
          <Text style={styles.dangnhap}>Dang nhap</Text>
        </TouchableOpacity>

        {/* chua co taikhoan _FIX */}
        <View style={styles.viewTextForgetPassword}>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => {
              navigation.navigate(RoutesName.ForgetPassword);
            }}>
            <Text style={styles.textFogetPassword}>Forgot Password</Text>
          </TouchableOpacity>

          <Text style={styles.taikhoan}>
            {`Chua co tai khoan? `}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(RoutesName.Register);
              }}>
              <Text style={styles.dangky}>Dang ky</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* login with */}
        <TouchableOpacity style={styles.touchLogin}>
          <Text style={styles.textLogin}>login with </Text>
        </TouchableOpacity>

        {/* facebook */}
        <TouchableOpacity style={styles.touchableOpacity1}>
          <Image style={styles.fb} source={Images.fb} />
          <Text style={styles.textButton1}>login with Facebook</Text>
        </TouchableOpacity>

        {/* google */}
        <TouchableOpacity style={styles.touchableOpacity2}>
          <Image style={styles.google} source={Images.google} />
          <Text style={styles.textButton2}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
