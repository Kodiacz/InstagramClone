import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import useSafeArea from '../../custom-hooks/useSafeView';

interface IAppProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function App({ navigation }: IAppProps) {
	const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>();
	const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
	const [type, setType] = useState(CameraType.back);
	const [camera, setCamera] = useState<Camera | null>();
	const [image, setImage] = useState<string | null>(null);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const { safeArea } = useSafeArea();

	console.log(safeArea);

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === 'granted');

			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasGalleryPermission(galleryStatus.status === 'granted');
		})();
	}, []);

	if (hasCameraPermission === null || hasGalleryPermission === null) {
		// Camera permissions are still loading
		return <View />;
	}

	if (hasCameraPermission === false || hasGalleryPermission === false) {
		// Camera permissions are not granted yet
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: 'center' }}>
					We need your permission to show the camera
				</Text>
				<Button
					onPress={requestPermission}
					title="grant permission"
				/>
			</View>
		);
	}

	async function takePicture() {
		if (camera) {
			const data = await camera.takePictureAsync();
			setImage(data.uri);
		}
	}

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back,
		);
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	console.log('{ ...styles.container, ...safeArea } => ', {
		...styles.container,
		...safeArea,
	});
	return (
		<View style={{ ...safeArea, ...styles.container }}>
			<View style={styles.cameraContainer}>
				<Camera
					ref={(ref) => setCamera(ref)}
					style={styles.camera}
					type={type}
					ratio={'1:1'}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={toggleCameraType}
					style={styles.button}
				>
					<Text style={styles.text}>Flip camera</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => takePicture()}
					style={styles.button}
				>
					<Text style={styles.text}>Take picture</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => pickImage()}
					style={styles.button}
				>
					<Text style={styles.text}>Pick image from gallery</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						console.log(image);
						navigation.navigate('Save', { image });
					}}
					style={styles.button}
				>
					<Text style={styles.text}>Save</Text>
				</TouchableOpacity>
			</View>

			{image && (
				<Image
					source={{ uri: image }}
					style={{ flex: 1 }}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
	},
	cameraContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	camera: {
		flex: 1,
		// aspectRatio: 1,
	},
	buttonContainer: {
		flex: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'blue',
	},
});
