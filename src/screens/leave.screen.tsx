import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {NHCTextTypes} from '../enums';
import {useSelector} from 'react-redux';
import {NHCText, NHCPrimaryHeader, NHCButton, NHCModal} from '../components';
import {getScaledNumber} from '../library/utils';
import {Calendar} from 'react-native-calendars';
import colors from '../res/colors';

const HR = () => {
  const user = useSelector(state => state?.user?.user);

  const [modalVisible, setModalVsible] = useState(false);
  const [leaveDate, setLeaveDate] = useState(new Date());

  const medicalHistoryModal = () => (
    <>
      <View style={styles.modalContent}>
        <NHCText
          label="You have selected"
          type={NHCTextTypes.BODY_SMALL}
          bold
        />
        <NHCText
          label={leaveDate}
          type={NHCTextTypes.H2}
          bold
          style={styles.leaveDateStyle}
        />
      </View>
      <NHCButton
        // onPress={() => setModalVsible(false)}
        label="Book Leave"
        style={styles.sendButton}
      />
      <NHCButton
        onPress={() => setModalVsible(false)}
        label="Close"
        style={styles.closeButton}
      />
    </>
  );

  return (
    <NHCPrimaryHeader
      enableDrawer
      backKey
      disableBottomPadding
      containerStyle={styles.container}>
      <View style={styles.userInfoContainer}>
        <NHCText label="Welcome" type={NHCTextTypes.H3} bold />
        <NHCText
          label={`${user?.firstName} ${user?.lastName}`}
          type={NHCTextTypes.H1}
          bold
        />

        <View style={styles.statusContent}>
          <NHCText label="LEAVE" type={NHCTextTypes.H4} bold />
        </View>
      </View>
      <View style={styles.content}>
        <NHCText label="Search in Calendar" type={NHCTextTypes.H3} />
        <Calendar
          // Initially visible month. Default = Date()
          // current={'2012-03-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={'2012-05-10'}
          // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={'2012-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            console.log(day, 'fff');
            setLeaveDate(day.dateString);
            setModalVsible(true);
          }}
          enableSwipeMonths={true}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MMM dd'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          // hideArrows={true}
          // Do not show days of other months in month page. Default = false
          // hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          // disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          // firstDay={1}
        />
        {/* <NHCButton
          onPress={() => setModalVsible(true)}
          label="CONTACT HR"
          style={styles.bottomButton}
        /> */}
      </View>

      <NHCModal
        contentStyle={styles.modalContentStyle}
        modalVisible={modalVisible}>
        {medicalHistoryModal()}
      </NHCModal>
    </NHCPrimaryHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: getScaledNumber(40),
  },
  modalContent: {
    width: '80%',
    alignItems: 'center',
  },

  leaveDateStyle: {
    marginTop: getScaledNumber(10),
    color: colors.lightBlue,
  },
  modalContentStyle: {
    alignItems: 'center',
    paddingVertical: getScaledNumber(40),
  },
  description: {
    marginTop: getScaledNumber(20),
    textAlign: 'center',
  },
  bottomButton: {
    width: '80%',
    backgroundColor: colors.darkGreen,
    borderRadius: getScaledNumber(5),
    // marginTop: getScaledNumber(20),
  },
  closeButton: {
    // marginTop: getScaledNumber(25),
    width: '80%',
    backgroundColor: colors.darkGreen,
  },
  sendButton: {
    marginTop: getScaledNumber(25),
    width: '80%',
    backgroundColor: colors.darkGreen,
  },

  content: {
    flex: 1,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-around',
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
