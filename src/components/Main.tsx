import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';

interface IMainProps {
	fetchUser: any;
	currentUser?: User;
}

interface IMainState {}

export class Main extends Component<IMainProps, IMainState> {
	componentDidMount(): void {
		this.props.fetchUser();
	}

	render() {
		const { currentUser } = this.props;

		console.log('Main.tsx - currentUser => ', currentUser);

		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<Text>{currentUser?.name ?? 'no user'} is logged in</Text>
			</View>
		);
	}
}

const mapStateToProps = (store: any) => ({
	currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch: any) =>
	bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
