import { Timespan } from 'react-native/Libraries/Utilities/IPerformanceLogger';

type User = {
	name: string;
	email: string;
};

type Post = {
	caption: string;
	creation: Timespan;
	downloadURL: string;
};

export { User, Post };
