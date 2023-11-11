import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { StackNavigationProp } from '@react-navigation/stack';

interface ISaveProps {
	route?: any;
	navigation: StackNavigationProp<ParamListBase>;
}

export default function Save({ route, navigation }: ISaveProps) {
	const [caption, setCaption] = useState<string>('');
	const image = route.params.image;
	const childPath = `post/${
		firebase.auth().currentUser!.uid
	}/${Math.random().toString(36)}`;

	console.log(navigation);

	const uploadImage = async () => {
		console.log('called uploadImage function');
		const uri = image;
		const response = await fetch(uri);
		console.log(response);
		const blob = await response.blob();
		console.log(blob);

		const task = firebase.storage().ref().child(childPath).put(blob);

		const taskProgress = (snapshot: any) => {
			console.log('called taskProgress function');
			console.log(`transferred: ${snapshot.bytesTransferred}`);
		};

		const taskCompleted = () => {
			console.log('called taskCompleted function');
			task.snapshot.ref.getDownloadURL().then((snapshot: any) => {
				savePostData(snapshot);
				console.log(snapshot);
			});
		};

		const taskError = (snapshot: any) => {
			console.log('called taskError function');
			console.log(snapshot);
		};

		task.on('state_change', taskProgress, taskError, taskCompleted);
		console.log('return from uploadImage function');
	};

	const savePostData = (downloadURL: any) => {
		firebase
			.firestore()
			.collection('posts')
			.doc(firebase.auth().currentUser!.uid)
			.collection('userPosts')
			.add({
				downloadURL,
				caption,
				creation: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(function () {
				navigation.popToTop();
			});
	};

	return (
		<View>
			<Image source={{ uri: image }} />
			<TextInput
				placeholder="Write a Caption . . ."
				onChangeText={(caption: string) => setCaption(caption)}
			/>
			<TouchableOpacity onPress={() => uploadImage()}>
				<Text>Save</Text>
			</TouchableOpacity>
		</View>
	);
}
