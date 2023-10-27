import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from 'react-native';

export default function App() {
	const [type, setType] = useState(CameraType.back);
	const [camera, setCamera] = useState<Camera | null>();
	const [image, setImage] = useState<string | null>(null);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}

	if (!permission.granted) {
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

	return (
		<View style={styles.container}>
			<View style={styles.cameraContainer}>
				<Camera
					ref={(ref) => setCamera(ref)}
					style={styles.camera}
					type={type}
					ratio={'1:1'}
				/>
			</View>

			<TouchableOpacity onPress={toggleCameraType}>
				<Text style={styles.text}>Flip camera</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => takePicture()}>
				<Text style={styles.text}>Take picture</Text>
			</TouchableOpacity>
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
	},
	cameraContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	camera: {
		flex: 1,
		aspectRatio: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 18,
		marginBottom: 10,
		fontWeight: 'bold',
		color: 'white',
	},
});
