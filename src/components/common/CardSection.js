import React from 'react';
import { View } from 'react-native';

// Create a component

const CardSection = (props) => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default CardSection;
