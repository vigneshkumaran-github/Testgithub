import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import  Modal  from 'react-native-modal';

const DialogModal = ({onchange,isopen}) => {
    const [isModalOpen, setIsModalOpen] = useState(isopen)
    
    
    
    return (
        <View>
            <Text onPress={()=>{setIsModalOpen(!isModalOpen)}}>CLICNDBHBDH</Text>
        <Modal
          isVisible={isModalOpen}
                onBackButtonPress={() => {
                    onchange(false);
                    setIsModalOpen(false)
                }}
                onBackdropPress={() => {
                    onchange(false)
                    setIsModalOpen(false)
                }
        }
          // onSwipeComplete={toggleModal}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={900}
          animationOutTiming={500}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={500}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.center}>
              <Text>hghfhfhg</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
}

export default DialogModal

const styles = StyleSheet.create({})