import { ActivityIndicator, StatusBar, View } from 'react-native';
import { AuthStacks, BottomStacks } from './Stacks';
import React, { useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/AuthContext';
import  OneSignal  from 'react-native-onesignal';
import { colors } from '../Constants/DesignContstants';

OneSignal.setAppId('ac8591db-9c39-494d-bd3e-7392e517762f');
OneSignal.promptForPushNotificationsWithUserResponse();
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification);
});
// OneSignal.getPermissionSubscriptionState(status => {
//   console.log(status?.userId, 'hgfihfhghfffjjdgfgfgf');
//   AsyncStorage.setItem('onesignal_id', status.userId);
// });



const AppNav = () => {
  const { UserToken, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primarycolor} />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={colors.primarycolor} barStyle="light-content" />
      {UserToken !== null ? <BottomStacks /> : <AuthStacks />}
    </>
  );
};

export default AppNav;
