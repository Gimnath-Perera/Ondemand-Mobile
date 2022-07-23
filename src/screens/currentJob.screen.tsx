import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader, NHCButton, NHCModal} from '../components';
import {getScaledNumber} from '../library/utils';
import colors from '../res/colors';
import JobImage from '../res/images/job.svg';

const CurrentJob = () => {
  const route = useRoute();
  const data = route?.params?.data;
  const status = route?.params?.status;
  const user = useSelector(state => state?.user?.user);

  return (
    <NHCPrimaryHeader
      enableDrawer
      isScrollView
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

      {data?.map(job => (
        <TouchableOpacity style={styles.jobCard} key={job._id}>
          <View style={styles.dataCol}>
            <JobImage />
          </View>
          <View style={styles.dataCol}>
            <NHCText label={job?.name} type={NHCTextTypes.H4} />
            <NHCText label={`J-${job?.jobId}`} type={NHCTextTypes.H4} />
          </View>

          <View style={styles.dataCol}>
            <NHCText
              label={`${moment(job?.startDate).format('YYYY/MM/DD') || '-'}`}
              type={NHCTextTypes.H4}
            />
            <NHCText
              label={`${moment(job?.endDate).format('YYYY/MM/DD') || '-'}`}
              type={NHCTextTypes.H4}
            />
          </View>
          <View style={styles.dataCol}>
            <NHCText label={`${job?.scheduleType}`} type={NHCTextTypes.H4} />
          </View>
          <View style={styles.dataCol}>
            <NHCText label={`${job?.status}`} type={NHCTextTypes.H4} />
          </View>
        </TouchableOpacity>
      ))}
    </NHCPrimaryHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: getScaledNumber(40),
  },

  jobCard: {
    paddingVertical: getScaledNumber(10),
    paddingHorizontal: getScaledNumber(20),
    marginBottom: getScaledNumber(10),
    width: '90%',
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
  dataCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: getScaledNumber(7),
  },
});

export default CurrentJob;
