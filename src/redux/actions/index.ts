// local improts
import { USER_STATE_CHANGE } from '../constants';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export function fetchUser() {
	return (dispatch: any) => {
		firebase
			.firestore()
			.collection('users')
			.doc(firebase.auth().currentUser?.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					console.log('index.ts - snapshot => ', snapshot);
					dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data });
				} else {
					console.log('does not exists');
				}
			});
	};
}
