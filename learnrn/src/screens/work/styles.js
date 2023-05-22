import {StyleSheet} from 'react-native';
import {moderateScale} from '../../config';

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
