import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import useSafeArea from '../../custom-hooks/useSafeView';
import { connect } from 'react-redux';

function Profile() {
	const { safeArea } = useSafeArea();

	console.log(safeArea);

	return (
		<View style={safeArea}>
			<Text>Profile</Text>
		</View>
	);
}

const styles = StyleSheet.create({});

const mapStateToProps = (store: any) => ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
