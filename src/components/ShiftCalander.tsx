import React from 'react';
import {StyleSheet, View, Platform, TextInput} from 'react-native';
import colors from '../res/colors';
import {NHCButton, NHCText} from '../components';
import {getScaledNumber} from '../library/utils';
import {NHCTextTypes} from '../enums';

type ShiftCalanderProps = {
  shifts: any;
  onClose: Function;
};

const ShiftCalander = ({shifts, onClose}: ShiftCalanderProps) => {
  const convertedData = () => {
    if (shifts?.length > 0) {
      let _shifts = [];
      shifts?.map((shift: any) => {
        shift?.dates?.map((date: any) => {
          let tempObj = {
            date: date,
            times: shift?.times,
          };
          _shifts.push(tempObj);
        });
      });
      return _shifts;
    }
    return [];
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {convertedData()?.length > 0 ? (
          <>
            {convertedData()?.map((data: any, index: number) => (
              <View style={styles.calanderItem} key={index}>
                <NHCText label={`Monday`} type={NHCTextTypes.H4} />
              </View>
            ))}
          </>
        ) : (
          <NHCText label={`No scheduled shifts found`} type={NHCTextTypes.H4} />
        )}
      </View>
      <View style={styles.optionContent}>
        <NHCButton onPress={onClose} label="Close" style={styles.closeBtn} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  closeBtn: {backgroundColor: '#ff7b7b', width: '50%'},
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  modalContent: {
    maxWidth: '100%',
    paddingHorizontal: getScaledNumber(30),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  modalContainer: {},
  calanderItem: {
    paddingVertical: getScaledNumber(20),
    paddingHorizontal: getScaledNumber(20),
    margin: getScaledNumber(10),
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
});

export default ShiftCalander;
