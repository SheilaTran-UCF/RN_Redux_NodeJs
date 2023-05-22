import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {register} from '../../api/auth-api';
import Images from '../../assets/images';
import {getWidth, moderateScale} from '../../config';
import {useNavigation, useRoute} from '@react-navigation/native';

const styles = StyleSheet.create({
  textHeader: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: moderateScale(22),
    marginBottom: moderateScale(16),
    marginLeft: moderateScale(28),
  },
  textContent: {
    fontSize: moderateScale(15),
    color: '#828282',
  },
  textName: {
    marginLeft: moderateScale(28),
    fontSize: moderateScale(13),
    marginBottom: moderateScale(8),
    color: '#1B1A1A',
    lineHeight: moderateScale(20),
  },

  textPassword: {
    marginLeft: moderateScale(28),
    fontSize: moderateScale(13),
    marginTop: moderateScale(14),
    marginBottom: moderateScale(8),
    color: '#1B1A1A',
    lineHeight: moderateScale(20),
  },

  viewTextForgetPassword: {
    flexDirection: 'row',
    marginTop: moderateScale(24),
    width: getWidth(),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(18),
  },
  container: {
    backgroundColor: '#f1f4f6',
    flex: 1,
    justifyContent: 'center',
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
  input2: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3DEE8',
    fontSize: moderateScale(16),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    marginTop: moderateScale(12),
    color: '#4F4F4F',
    marginHorizontal: moderateScale(18),
    height: moderateScale(48),
  },
  dangnhap: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(32),
    marginHorizontal: moderateScale(18),
    height: moderateScale(48),
    // backgroundColor: 'yellow',
  },
  textButton1: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    paddingRight: moderateScale(16),
  },
  textButton2: {
    color: '#025DD7',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    paddingRight: moderateScale(16),
  },
  touchableOpacity: {
    backgroundColor: '#025DD7',

    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(8),
    alignItems: 'center',
    height: moderateScale(48),

    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(24),
  },
  touchableOpacity1: {
    marginLeft: moderateScale(78),
    marginRight: moderateScale(79),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    paddingVertical: moderateScale(12),
    alignItems: 'center',

    borderWidth: 1,
    marginTop: moderateScale(16),
    backgroundColor: '#1877F2',
    borderColor: '#2F80ED',
  },
  touchableOpacity2: {
    marginLeft: moderateScale(78),
    marginRight: moderateScale(79),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    paddingVertical: moderateScale(12),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#2F80ED',
    borderWidth: 1,
    marginBottom: moderateScale(47),
    marginTop: moderateScale(12),
  },

  tinyLogo: {
    marginTop: moderateScale(87),
    alignSelf: 'center',
    marginLeft: moderateScale(21),
    marginRight: moderateScale(22),
    marginBottom: moderateScale(87),
    height: moderateScale(90),
    width: moderateScale(332),
  },
  body: {
    // borderTopRightRadius: moderateScale(32),
    // borderTopLeftRadius: moderateScale(32),
  },
  tinyLogo1: {
    marginTop: moderateScale(28),
    marginBottom: moderateScale(14),
    marginLeft: moderateScale(28),
    height: moderateScale(26),
    width: moderateScale(162),
  },
  viewNameContent: {
    marginLeft: moderateScale(28),
    marginRight: moderateScale(28),
  },
  viewYourName: {
    marginTop: moderateScale(28),
  },
  eye: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  viewInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D3DEE8',
    width: moderateScale(339),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    backgroundColor: 'red',
    marginTop: moderateScale(20),
  },
  taikhoan: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
  },
  textFogetPassword: {
    fontSize: moderateScale(15),
    color: '#0364D9',
    lineHeight: moderateScale(22),
  },
  dangky: {
    fontSize: moderateScale(15),
    color: '#0364D9',
    lineHeight: moderateScale(22),
  },
  touchLogin: {
    marginTop: moderateScale(80),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#007BB3',
    width: moderateScale(247),
  },
  textLogin: {
    color: '#007BB3',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    alignSelf: 'center',
  },
  line: {
    color: '#007BB3',
    // width: moderateScale(247),
    marginBottom: moderateScale(6),
    marginHorizontal: moderateScale(64),
  },
  fb: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginLeft: moderateScale(16),
    marginRight: moderateScale(12),
  },
  google: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginLeft: moderateScale(16),
    marginRight: moderateScale(12),
  },
});

export default function RegisterScreen() {
  const navigation = useNavigation();
  const router = useRoute();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const handleSubmit = async () => {
    const res = await register({
      email: email,
      password: password,
      name: name,
    });
    console.log({res});
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
          placeholder="Email"
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
          value={password}
          autoCapitalize={false}
        />

        <TextInput
          style={styles.input2}
          onChangeText={val => {
            setName(val);
          }}
          placeholder="Ten nguoi dung"
          value={name}
          autoCapitalize={false}
        />

        {/* dang nhap */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.touchableOpacity}>
          <Text style={styles.dangnhap}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
