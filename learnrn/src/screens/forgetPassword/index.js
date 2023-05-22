import React, {useEffect} from 'react';
import {styles} from './styles';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {forgotPassword} from '../../api/auth-api';
import Images from '../../assets/images';
import {getWidth, moderateScale} from '../../config';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function ForgetPassword() {
  const navigation = useNavigation();
  const router = useRoute();
  const [email, setEmail] = React.useState('');

  // useEffect(() => {
  //   console.log('AAA: ', router?.params?.backLogin);
  // }, [router?.params?.backLogin]);

  const handleSubmit = async () => {
    const res = await forgotPassword({
      email: email,
    });
    // console.log({res});
    if (res.status === 200) {
      navigation.navigate('ResetPassword', {
        emailAddress: email,
      });
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
        />

        {/* password */}

        {/* dang nhap */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.touchableOpacity}>
          <Text style={styles.dangnhap}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
