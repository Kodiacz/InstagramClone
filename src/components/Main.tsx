import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';

// Local imports
import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

interface IMainProps {
	fetchUser: any;
	currentUser?: User;
}

interface IMainState {
	user: User;
}

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
	return null;
};

export class Main extends Component<IMainProps, IMainState> {
	componentDidMount(): void {
		this.setState(this.props.fetchUser());
	}

	render() {
		const { currentUser } = this.props;

		return (
			<Tab.Navigator
				initialRouteName="Feed"
				labeled={false}
			>
				<Tab.Screen
					name="Feed"
					component={FeedScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="home"
								color={color}
								size={26}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="AddContainer"
					component={EmptyScreen}
					listeners={({ navigation }) => ({
						tabPress: (event) => {
							event.preventDefault();
							navigation.navigate('Add');
						},
					})}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="plus-box"
								color={color}
								size={26}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={ProfileScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="account-circle"
								color={color}
								size={26}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		);
	}
}

const mapStateToProps = (store: any) => {
	return {
		currentUser: store.user?.currentUser,
	};
};

const mapDispatchProps = (dispatch: any) =>
	bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
