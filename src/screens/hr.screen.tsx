import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TextInput,
  FlatList,
  Image,
  Text,
} from 'react-native';
import moment from 'moment';

import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader, NHCButton, NHCModal} from '../components';
import {getScaledNumber, SCREEN_WIDTH} from '../library/utils';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAdminList,
  sendMessage,
  getChatByUser,
} from '../actions/user.actions';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage} from 'react-native-flash-message';
import colors from '../res/colors';

const HR = () => {
  const flatListRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user);
  const messageList = useSelector(state => state?.message?.messages);

  const [modalVisible, setModalVsible] = useState(false);
  const userId = useSelector(state => state?.user?.user?._id);
  const [description, setDescription] = useState([]);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    dispatch(
      getAdminList(list => {
        setAdmin(list?.[0]?.id);
      }),
    );
  }, []);

  useEffect(() => {
    userId && dispatch(getChatByUser(userId));
  }, []);

  useEffect(() => {
    messageList.length > 0 && flatListRef.current.scrollToEnd({animated: true});
  }, [messageList?.length]);

  const submitMessage = () => {
    const data = {
      to: admin,
      from: userId,
      description: description,
      isFromAdmin: false,
    };

    dispatch(
      sendMessage(
        data,
        () => {
          showMessage({
            message: 'Success',
            description: 'Message Sent!',
            type: 'success',
          });
          setModalVsible(false);
          setDescription('');
        },
        () => {
          showMessage({
            message: 'Error',
            description: 'Something went wrong',
            type: 'danger',
          });
          setModalVsible(false);
          setDescription('');
        },
      ),
    );
  };

  const isButtonDisabled = description.length === 0;

  const NewMessageModal = () => (
    <>
      <View style={styles.modalContent}>
        <View style={styles.toHeader}>
          <NHCText label="To Admin" type={NHCTextTypes.H4} bold />
        </View>

        <TextInput
          placeholderTextColor={colors.darkGray}
          multiline={true}
          style={styles.inputStyle}
          onChangeText={setDescription}
          numberOfLines={8}
          placeholder="Please type your query here..."
          underlineColorAndroid="transparent"
          value={description}
        />
      </View>
      <NHCButton
        onPress={submitMessage}
        label="SEND MESSAGE"
        style={isButtonDisabled ? styles.disabledSendButton : styles.sendButton}
        disabled={isButtonDisabled}
      />
      <NHCButton
        onPress={() => setModalVsible(false)}
        label="CLOSE"
        style={styles.closeButton}
      />
    </>
  );

  const MessageBubble = ({message}) => {
    return (
      <>
        {message?.isFromAdmin ? (
          <>
            <View style={styles.adminMessageBox} key={message?.id}>
              <Text
                style={{fontSize: 16, color: '#000', justifyContent: 'center'}}
                key={message?.id}>
                {message?.description || '-'}
              </Text>
              <View style={styles.leftArrow}></View>
              <View style={styles.leftArrowOverlap}></View>
            </View>

            <Text style={{fontSize: 9, textAlign: 'left', paddingLeft: 30}}>
              {moment(message?.createdAt).format('MM/DD HH:mm') || '-'}
            </Text>
          </>
        ) : (
          <>
            <View style={styles.userMessageBox} key={message?.id}>
              <Text style={{fontSize: 16, color: '#fff'}} key={message?.id}>
                {message?.description || '-'}
              </Text>

              <View style={styles.rightArrow}></View>
              <View style={styles.rightArrowOverlap}></View>
            </View>
            <Text style={{fontSize: 9, textAlign: 'right', paddingRight: 30}}>
              {moment(message?.createdAt).format('MM/DD HH:mm') || '-'}
            </Text>
          </>
        )}
      </>
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
          <NHCText label="MY HR" type={NHCTextTypes.H4} bold />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.commentSection}>
          {messageList?.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={messageList}
              renderItem={({item}) => <MessageBubble message={item} />}
              keyExtractor={item => item.id}
              onLayout={() => flatListRef.current.scrollToEnd({animated: true})}
            />
          ) : (
            <Text style={styles.msgTxt}>No previous messages</Text>
          )}
        </View>
        <NHCButton
          onPress={() => setModalVsible(true)}
          label="SEND NEW MESSAGE"
          style={styles.bottomButton}
        />
      </View>

      <NHCModal
        contentStyle={styles.modalContentStyle}
        modalVisible={modalVisible}>
        {NewMessageModal()}
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
  inputStyle: {
    padding: getScaledNumber(10),
    width: '100%',
    backgroundColor: colors.lightDarkGray,
    color: colors.darkGray,
    marginBottom: getScaledNumber(20),
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
    borderRadius: getScaledNumber(25),
  },
  closeButton: {
    width: '80%',
    borderRadius: getScaledNumber(25),
    backgroundColor: '#ff7b7b',
  },
  sendButton: {
    marginTop: getScaledNumber(25),
    width: '80%',
    backgroundColor: colors.darkGreen,
    borderRadius: getScaledNumber(25),
  },

  disabledSendButton: {
    marginTop: getScaledNumber(25),
    width: '80%',
    backgroundColor: colors.lightGray,
    borderRadius: getScaledNumber(25),
  },

  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
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

  adminMessageBox: {
    backgroundColor: '#dedede',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    marginLeft: '5%',
    maxWidth: '70%',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  userMessageBox: {
    backgroundColor: '#0078fe',
    padding: 10,
    marginLeft: '45%',
    borderRadius: 5,
    marginTop: 8,
    marginRight: '5%',
    maxWidth: '70%',
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  profilePic: {
    width: 42,
    height: 42,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentDetail: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  commentText: {
    fontSize: 13,
    maxWidth: 285,
  },
  timeText: {
    fontSize: 10,
    paddingLeft: 1,
  },
  commentSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    width: '100%',
    height: '90%',
  },
  toHeader: {
    backgroundColor: colors.primary,
    padding: 8,
    width: '100%',
    margin: 20,
  },

  rightArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: colors.backgroundColor,
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  leftArrow: {
    position: 'absolute',
    backgroundColor: '#dedede',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: colors.backgroundColor,
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingHorizontal: 15,
    marginBottom: getScaledNumber(20),
    height: getScaledNumber(40),
    width: SCREEN_WIDTH * 0.72,
    paddingVertical: Platform.OS === 'ios' ? 10 : 1,
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    color: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  inputAndroid: {
    paddingHorizontal: 15,
    marginBottom: getScaledNumber(20),
    marginTop: getScaledNumber(20),
    height: getScaledNumber(40),
    width: SCREEN_WIDTH * 0.72,
    paddingVertical: Platform.OS === 'ios' ? 16 : 1,
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    color: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  viewContainer: {
    alignItems: 'center',
  },
  placeholder: {
    color: colors.white,
    fontWeight: '700',
  },
});
export default HR;
