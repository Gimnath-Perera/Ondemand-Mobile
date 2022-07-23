import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {NHCTextTypes} from '../enums';
import {useSelector} from 'react-redux';
import {NHCText, NHCModal, NHCPrimaryHeader, NHCButton} from '../components';
import {getScaledNumber} from '../library/utils';
// import Pdf from 'react-native-pdf';
import colors from '../res/colors';

const HR = () => {
  const user = useSelector(state => state?.user?.user);
  const [modalVisible, setModalVsible] = useState(false);
  const [currentPDF, setCurrentPDF] = useState(null);
  const PDF1 = {
    uri: 'https://nhc-wiki.s3.ap-southeast-2.amazonaws.com/NHC+T01+CPR.pdf',
    cache: true,
  };
  const PDF2 = {
    uri: 'https://nhc-wiki.s3.ap-southeast-2.amazonaws.com/NHC+T02+Manual+Handling.pdf',
    cache: true,
  };
  const PDF3 = {
    uri: 'https://nhc-wiki.s3.ap-southeast-2.amazonaws.com/NHC+T03+First+Aid.pdf',
    cache: true,
  };
  const PDF4 = {
    uri: 'https://nhc-wiki.s3.ap-southeast-2.amazonaws.com/NHC+T04+Covid+Safe+work+practices.pdf',
    cache: true,
  };
  const PDF5 = {
    uri: 'https://nhc-wiki.s3.ap-southeast-2.amazonaws.com/NHC+T05+Disposal+of+clinical+waste.pdf',
    cache: true,
  };

  const openModal = pdf => {
    setCurrentPDF(pdf);

    setModalVsible(true);
  };

  const pdfModal = () => (
    <View style={styles.modalContent}>
      {/* <Pdf
        source={currentPDF !== null && currentPDF}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      /> */}
      <NHCButton
        onPress={() => setModalVsible(false)}
        label="CLOSE"
        style={styles.closeButton}
      />
    </View>
  );

  return (
    <NHCPrimaryHeader
      enableDrawer
      backKey
      isScrollView
      disableBottomPadding
      containerStyle={styles.container}>
      <View style={styles.userInfoContainer}>
        <NHCText label="Welcome" type={NHCTextTypes.H3} bold />
        <NHCText label={`${user?.fullName}`} type={NHCTextTypes.H1} bold />

        <View style={styles.statusContent}>
          <NHCText label="GUIDE" type={NHCTextTypes.H4} bold />
        </View>
      </View>
      <View style={styles.content}>
        <NHCText
          style={styles.description}
          label="First-Aid 101"
          type={NHCTextTypes.H4}
          bold
        />
        <NHCButton
          onPress={() => openModal(PDF1)}
          label="OPEN"
          style={styles.bottomButton}
        />
      </View>

      <View style={styles.content}>
        <NHCText
          style={styles.description}
          label="Elder care 101"
          type={NHCTextTypes.H4}
          bold
        />
        <NHCButton
          onPress={() => openModal(PDF2)}
          label="OPEN"
          style={styles.bottomButton}
        />
      </View>

      <View style={styles.content}>
        <NHCText
          style={styles.description}
          label="Basic CPR"
          type={NHCTextTypes.H4}
          bold
        />
        <NHCButton
          onPress={() => openModal(PDF3)}
          label="OPEN"
          style={styles.bottomButton}
        />
      </View>

      <View style={styles.content}>
        <NHCText
          style={styles.description}
          label="Dipers "
          type={NHCTextTypes.H4}
          bold
        />
        <NHCButton
          onPress={() => openModal(PDF4)}
          label="OPEN"
          style={styles.bottomButton}
        />
      </View>

      <View style={styles.content}>
        <NHCText
          style={styles.description}
          label="Wound Dressing"
          type={NHCTextTypes.H4}
          bold
        />
        <NHCButton
          onPress={() => openModal(PDF5)}
          label="OPEN"
          style={styles.bottomButton}
        />
      </View>

      <NHCModal
        contentStyle={styles.modalContentStyle}
        modalVisible={modalVisible}>
        {pdfModal()}
      </NHCModal>
    </NHCPrimaryHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingVertical: getScaledNumber(30),
    paddingHorizontal: getScaledNumber(20),
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  userDetails: {
    paddingVertical: getScaledNumber(30),
    paddingHorizontal: getScaledNumber(20),
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderRadius: getScaledNumber(15),
  },
  inputStyle: {
    padding: getScaledNumber(10),
    width: '90%',
    backgroundColor: colors.lightDarkGray,
    color: colors.darkGray,
    marginBottom: getScaledNumber(20),
  },
  modalContentStyle: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    paddingVertical: getScaledNumber(40),
  },
  description: {
    marginTop: getScaledNumber(20),
    textAlign: 'center',
  },
  bottomButton: {
    width: '30%',
    backgroundColor: colors.darkGreen,
    borderRadius: getScaledNumber(5),
    paddingVertical: 7,
  },
  closeButton: {
    // marginTop: getScaledNumber(25),
    width: '80%',
    backgroundColor: colors.labelGrey,
  },
  sendButton: {
    marginTop: getScaledNumber(25),
    width: '80%',
    backgroundColor: colors.darkGreen,
  },

  content: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  modalDescription: {
    textAlign: 'center',
    lineHeight: getScaledNumber(19),
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

export default HR;
