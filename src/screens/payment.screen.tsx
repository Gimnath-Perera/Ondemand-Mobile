import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader, NHCButton} from '../components';
import {getScaledNumber} from '../library/utils';
import colors from '../res/colors';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import {showMessage} from 'react-native-flash-message';
import {endLoading, startLoading} from '../actions/common.action';

const startOfMonth = moment()
  .clone()
  .startOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');

const endOfMonth = moment()
  .clone()
  .endOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');

const BASE_URL = 'https://ondemand-dev.herokuapp.com';

const generateInvoiceId = (worker: any) => {
  const _date = moment().format('YYYY-MM-DD');
  return `${_date.toString().replace(/-/g, '')}E${worker}`;
};

const Work = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const downloadPDF = () => {
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'example.pdf',
      path: `${dirToSave}/${generateInvoiceId(user?.userId)}.pdf`,
    };

    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });

    dispatch(startLoading());
    RNFetchBlob.config(configOptions)
      .fetch(
        'GET',
        `${BASE_URL}/v1/payments/${user?._id}?startDate=${moment(
          startOfMonth,
        ).format('YYYY-MM-DD')}&endDate=${moment(endOfMonth).format(
          'YYYY-MM-DD',
        )}`,
        {},
      )
      .then(res => {
        dispatch(endLoading());
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(configfb.path);
        }

        if (Platform.OS == 'android') {
          showMessage({
            message: 'Success',
            description: 'File downloaded succesfully!',
            type: 'success',
          });
        }

        Alert.alert('Sucess', `The file saved to your device`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      })
      .catch(e => {
        dispatch(endLoading());
        showMessage({
          message: 'Error',
          description: 'Something went wrong',
          type: 'danger',
        });
      });
  };

  const sendInvoices = () => {
    console.log('Call submit invoice API');
  };
  return (
    <NHCPrimaryHeader
      enableDrawer
      backKey
      disableBottomPadding
      containerStyle={styles.container}>
      <View style={styles.userInfoContainer}>
        <NHCText label="Welcome" type={NHCTextTypes.H3} bold />
        <NHCText label={`${user?.fullName}`} type={NHCTextTypes.H1} bold />

        <View style={styles.statusContent}>
          <NHCText label="PAYMENT" type={NHCTextTypes.H4} bold />
        </View>
      </View>

      <View style={styles.commonContent}>
        <NHCButton
          onPress={downloadPDF}
          label="Generate Invoice (Fortnite)"
          style={styles.commonContainer}
        />
        <NHCButton
          style={styles.disableContainer}
          label="Send Invoice (Fortnite)"
          onPress={sendInvoices}
          disabled
        />
      </View>
    </NHCPrimaryHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: getScaledNumber(40),
  },
  commonTextstyle: {
    color: colors.white,
  },
  commonContent: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  age: {
    marginTop: getScaledNumber(16),
  },
  commonContainer: {
    paddingVertical: getScaledNumber(13),
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginTop: getScaledNumber(20),
    borderRadius: getScaledNumber(25),
  },
  disableContainer: {
    paddingVertical: getScaledNumber(13),
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginTop: getScaledNumber(20),
    borderRadius: getScaledNumber(25),
  },
  tileText: {
    marginTop: getScaledNumber(3),
  },

  statusContent: {
    backgroundColor: colors.white,
    width: '40%',
    padding: getScaledNumber(10),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: getScaledNumber(10),
    borderRadius: getScaledNumber(20),
  },

  userInfoContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingHorizontal: getScaledNumber(20),
    paddingBottom: getScaledNumber(20),
    borderBottomLeftRadius: getScaledNumber(40),
    borderBottomRightRadius: getScaledNumber(40),

    marginBottom: getScaledNumber(20),
  },
});

export default Work;
