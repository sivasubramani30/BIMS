import React, { Component } from 'react';
import {Button,View} from 'react-native';


export default class ProfileScreen extends React.Component { static navigationOptions = { title: 'Welcome', }; 
	render() 
	{ 
		const {navigate} = this.props.navigation; 
		return ( 
			<View>
			<Button title="Logout" 
				onPress= 
				{
					()=>
					{
						this.props.navigation.navigate('Home')
					}
				}>
			</Button>
</View>
			);
	}
}