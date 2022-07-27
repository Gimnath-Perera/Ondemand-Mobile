import React, {useState} from 'react';
import {useNavigation, useRoute, StackActions} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCHeader, NHCButton} from '../components';
import {getScaledNumber, SCREEN_HEIGHT} from '../library/utils';
import {REVIEW_SCREEN} from '../common/constants';
import {useDispatch, useSelector} from 'react-redux';
import {uploadDocuments} from '../actions/user.actions';
import UploadIcon from '../res/images/uploadIcon.svg';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import colors from '../res/colors';

const SignUpScreen6 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [policeClearence, setPoliceClearencePhoto] = useState(null);
  const [currentVisa, setCurrentVisa] = useState(null);
  const [vaccine, setVaccine] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);

  const userId = useSelector(state => state?.user?.userId);
  const idPhoto = route?.params?.idPhoto;

  const isButtonDisabled =
    policeClearence === null &&
    currentVisa === null &&
    vaccine === null &&
    proofOfAddress === null &&
    idPhoto === null;

  const onSubmit = () => {
    const data = new FormData();

    if (idPhoto !== null) {
      data.append('files', idPhoto);
    }
    if (currentVisa !== null) {
      data.append('files', currentVisa);
    }
    if (vaccine !== null) {
      data.append('files', vaccine);
    }
    if (proofOfAddress !== null) {
      data.append('files', proofOfAddress);
    }
    if (policeClearence !== null) {
      data.append('files', policeClearence);
    }
    data.append('owner', userId);

    dispatch(
      uploadDocuments(
        data,
        () => {
          showMessage({
            message: 'Success',
            description: 'Documents uploaded succesfully',
            type: 'success',
          });
          // this will remount the review screen to fetch status
          navigation.dispatch(StackActions.replace(REVIEW_SCREEN));
        },
        data => {
          showMessage({
            message: 'Error',
            description: 'Something went Wrong',
            type: 'danger',
          });
          navigation.dispatch(StackActions.replace(REVIEW_SCREEN));
        },
      ),
    );
  };

  const chooseFile = async type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: 1,
    };
    try {
      const {assets} = await launchImageLibrary(options);

      const data = {
        uri: assets[0].uri,
        name: `${type}.${assets[0].fileName?.split('.')[1]}`,
        type: assets[0].type,
      };

      if (type === 'policeClearence') {
        setPoliceClearencePhoto(data);
      }
      if (type === 'currentVisa') {
        setCurrentVisa(data);
      }
      if (type === 'vaccine') {
        setVaccine(data);
      }
      if (type === 'proofOfAddress') {
        setProofOfAddress(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NHCHeader
      isScrollView
      disableBottomPadding
      containerStyle={styles.scrollViewStyle}
      safeAreaStyle={styles.headerStyle}>
      <View style={styles.topContent} />
      <View style={styles.container}>
        <View style={styles.inputContent}>
          <NHCText label=" Sign Up" type={NHCTextTypes.H1} />

          <NHCText
            label="Please upload a valid Police clearence, Working with kids, first-aid and proofOfAddress qualifications below"
            type={NHCTextTypes.H4}
            style={styles.description}
          />

          <NHCText
            label="Police Clearence"
            bold
            type={NHCTextTypes.H4}
            style={styles.uploadImageText}
          />
          <TouchableOpacity
            onPress={() => chooseFile('policeClearence')}
            style={styles.uploadContent}>
            <UploadIcon />
            <NHCText
              label={policeClearence === null ? 'Upload Image' : 'Uploaded'}
              type={NHCTextTypes.H4}
              style={styles.uploadImageText}
            />
          </TouchableOpacity>

          <NHCText
            label="Current Visa"
            bold
            type={NHCTextTypes.H4}
            style={styles.uploadImageText}
          />
          <TouchableOpacity
            onPress={() => chooseFile('currentVisa')}
            style={styles.uploadContent}>
            <UploadIcon />
            <NHCText
              label={currentVisa === null ? 'Upload Image' : 'Uploaded'}
              type={NHCTextTypes.H4}
              style={styles.uploadImageText}
            />
          </TouchableOpacity>
          <NHCText
            label="Vaccine Card"
            bold
            type={NHCTextTypes.H4}
            style={styles.uploadImageText}
          />
          <TouchableOpacity
            onPress={() => chooseFile('vaccine')}
            style={styles.uploadContent}>
            <UploadIcon />
            <NHCText
              label={vaccine === null ? 'Upload Image' : 'Uploaded'}
              type={NHCTextTypes.H4}
              style={styles.uploadImageText}
            />
          </TouchableOpacity>
          <NHCText
            label="Proof Of Address"
            bold
            type={NHCTextTypes.H4}
            style={styles.uploadImageText}
          />
          <TouchableOpacity
            onPress={() => chooseFile('proofOfAddress')}
            style={styles.uploadContent}>
            <UploadIcon />
            <NHCText
              label={proofOfAddress === null ? 'Upload Image' : 'Uploaded'}
              type={NHCTextTypes.H4}
              style={styles.uploadImageText}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContent}>
          <NHCButton
            disabled={isButtonDisabled}
            onPress={onSubmit}
            label="Submit"
          />
          <NHCButton onPress={() => navigation.goBack()} label="Back" />
        </View>
      </View>
    </NHCHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: getScaledNumber(30),
    marginBottom: getScaledNumber(40),
    marginTop: SCREEN_HEIGHT * 0.03,
    justifyContent: 'space-between',
  },
  scrollViewStyle: {
    flex: 1,
  },
  description: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: getScaledNumber(20),
    // fontSize: getScaledNumber(14),
  },
  uploadContent: {
    flexDirection: 'row',
    marginTop: getScaledNumber(20),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadImageText: {
    alignSelf: 'flex-start',
    marginTop: getScaledNumber(20),
  },
  topContent: {
    backgroundColor: colors.primary,
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    right: 0,
    left: 0,
    top: 0,
    height: SCREEN_HEIGHT * 0.3,
    borderBottomLeftRadius: getScaledNumber(30),
    borderBottomRightRadius: getScaledNumber(30),
  },
  headerStyle: {
    backgroundColor: colors.primary,
  },
  bottomContent: {
    width: '100%',
  },
  terms: {
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: getScaledNumber(20),
  },
  inputStyle: {
    marginTop: getScaledNumber(30),
  },
  bottomTextContent: {
    alignItems: 'center',
    marginBottom: getScaledNumber(20),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputContent: {
    // justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: getScaledNumber(30),
    paddingHorizontal: getScaledNumber(15),
    paddingVertical: getScaledNumber(30),
    width: '100%',
    backgroundColor: colors.white,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  signInText: {
    fontWeight: '700',
    color: colors.secondary,
  },
});

export default SignUpScreen6;
