import {StyleSheet} from 'react-native';
import {getWidth, moderateScale} from '../../config';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f4f6',
    flex: 1,
    // justifyContent: 'center',
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
  taikhoan: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
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
  listContainer: {
    flexDirection: 'row',

    marginTop: moderateScale(20),
    justifyContent: 'space-between',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    marginHorizontal: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  itemTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  itemDescriber: {
    fontSize: moderateScale(18),
    // fontWeight: 'bold',
  },
  delete: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
  },
  update: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginTop: moderateScale(5),
  },
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
    right: 10,
  },
});
