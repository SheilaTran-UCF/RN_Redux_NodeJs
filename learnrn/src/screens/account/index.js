import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {navigate} from '../../navigation/root-navigation';
import {useNavigation, useRoute} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f4f6',
    flex: 1,
    justifyContent: 'center',
  },
});

export default function AccountScreen() {
  const navigation = useNavigation();
  const router = useRoute();

  const {emailAddress} = router.params;

  return (
    <View style={styles.container}>
      <Text>Account screen</Text>
      <Text>email address: {emailAddress}</Text>
      <Button title="go back" onPress={() => navigation.goBack()} />
      <Button title="go to login" onPress={() => navigation.popToTop()} />
    </View>
  );
}
