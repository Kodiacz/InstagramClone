import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import useSafeArea from '../../custom-hooks/useSafeView';

export default function Feed() {
	const { safeArea } = useSafeArea();

	console.log(safeArea);

	return (
		<View style={safeArea}>
			<Text>Feed</Text>
		</View>
	);
}
