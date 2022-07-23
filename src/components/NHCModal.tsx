import React, {ReactElement} from 'react';
import {Modal, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import { getScaledNumber } from '../library/utils';

const CricantoModal = ({
  modalVisible,
  children,
  contentStyle,
}: {
  modalVisible: boolean;
  children: ReactElement;
  contentStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={styles.container}>
      <View style={[styles.container]}>
        <View style={[styles.modalView, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: getScaledNumber(20),
    borderTopRightRadius: getScaledNumber(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CricantoModal;
