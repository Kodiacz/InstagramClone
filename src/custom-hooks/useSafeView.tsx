import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useSafeArea = () => {
	const insets = useSafeAreaInsets();
	return StyleSheet.create({
		safeArea: { paddingTop: insets.top, paddingBottom: insets.bottom },
	});
};

export default useSafeArea;
