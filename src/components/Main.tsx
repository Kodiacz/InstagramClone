import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts } from '../redux/actions';

// Local imports
import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import { User } from '../utils/types';

interface IMainProps {
	fetchUser: any;
	fetchUserPosts: any;
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
		this.setState(this.props.fetchUserPosts());
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
		// posts: store.posts.posts,
	};
};

const mapDispatchProps = (dispatch: any) =>
	bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
