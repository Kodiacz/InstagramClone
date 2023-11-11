import React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import useSafeArea from '../../custom-hooks/useSafeView';
import { connect } from 'react-redux';
import { Post, User } from '../../utils/types';

interface IProfileProps {
	currentUser: User;
	posts: Post[];
}

function Profile({ currentUser, posts }: IProfileProps) {
	const { safeArea } = useSafeArea();
	console.log(posts);

	return (
		<View style={{ ...styles.container, ...safeArea }}>
			<View style={styles.containerInfo}>
				<Text>{currentUser.name}</Text>
				<Text>{currentUser.email}</Text>
			</View>
			<View style={styles.containerGallery}>
				<FlatList
					numColumns={3}
					horizontal={false}
					data={posts}
					renderItem={({ item }) => {
						return (
							<View style={styles.containerImage}>
								<Image
									style={styles.imageStyle}
									source={{ uri: item.downloadURL }}
								/>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
	},
	containerInfo: {
		margin: 10,
	},
	containerGallery: {
		flex: 1,
	},
	imageStyle: {
		flex: 1,
		aspectRatio: 1 / 1,
	},
	containerImage: {
		flex: 1 / 3,
	},
});

const mapStateToProps = (store: any) => ({
	currentUser: store.user?.currentUser,
	posts: store.user?.posts,
});

export default connect(mapStateToProps, null)(Profile);
