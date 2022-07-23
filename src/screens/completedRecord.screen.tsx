import React from 'react';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader} from '../components';
import {getScaledNumber} from '../library/utils';
import colors from '../res/colors';
import CheckImage from '../res/images/check.svg';
import moment from 'moment';

export const convertTimeValue = (timeString: string) => {
  const timeString12hr = new Date(
    '1970-01-01T' + timeString + 'Z',
  ).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
  return timeString12hr;
};

const CurrentJob = () => {
  const route = useRoute();
  const list = route?.params?.list;
  const status = route?.params?.status;
  const user = useSelector(state => state?.user?.user);

  const RecordCard = ({record}) => {
    return (
      <TouchableOpacity style={styles.recordCard} key={record._id}>
        <View style={styles.dataView}>
          <CheckImage />
        </View>
        <View style={styles.dataView}>
          <NHCText
            label={`${moment(record?.logginDate).format('YYYY/MM/DD') || '-'}`}
            type={NHCTextTypes.H4}
          />
          <NHCText
            label={`${moment(record?.logginDate).format('dddd') || '-'}`}
            type={NHCTextTypes.H4}
          />
        </View>
        <View style={styles.dataView}>
          <NHCText label={`${record?.job?.name}`} type={NHCTextTypes.H4} />
        </View>
        <View style={styles.dataView}>
          <NHCText
            label={`${convertTimeValue(record?.startTime)} - ${convertTimeValue(
              record?.endTime,
            )}`}
            type={NHCTextTypes.H4}
          />
          <NHCText
            label={`${record?.workingHours} Hours`}
            type={NHCTextTypes.H4}
          />
        </View>
        <View style={styles.dataView}>
          <NHCText label={`${record?.status}`} type={NHCTextTypes.H4} />
          {record?.locationStatus ? (
            <NHCText label={'Matched'} type={NHCTextTypes.H4} />
          ) : (
            <NHCText label={'Unmatched'} type={NHCTextTypes.H4} />
          )}
        </View>
      </TouchableOpacity>
    );
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
          <NHCText label={`${status} Jobs`} type={NHCTextTypes.H4} bold />
        </View>
      </View>
      <View style={styles.recordSection}>
        {list?.results?.length > 0 ? (
          <FlatList
            data={list?.results}
            renderItem={({item}) => <RecordCard record={item} />}
            keyExtractor={item => item?.record?._id}
          />
        ) : (
          <NHCText label={`No previous records`} type={NHCTextTypes.H4} bold />
        )}
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

  recordCard: {
    paddingVertical: getScaledNumber(10),
    paddingHorizontal: getScaledNumber(10),
    marginBottom: getScaledNumber(10),
    width: '100%',
    backgroundColor: colors.white,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderRadius: getScaledNumber(10),
    display: 'flex',
    flexDirection: 'row',
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
  dataView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: getScaledNumber(8),
  },
  recordSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '80%',
    backgroundColor: colors.white,
    paddingHorizontal: getScaledNumber(10),
  },
});

export default CurrentJob;
