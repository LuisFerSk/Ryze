import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA-XRTS81NvnN0wTDba5tbsOpeyVp3tYgo",
	authDomain: "ryze-a0d2d.firebaseapp.com",
	projectId: "ryze-a0d2d",
	storageBucket: "ryze-a0d2d.appspot.com",
	messagingSenderId: "47095546304",
	appId: "1:47095546304:web:faa09f7837059d1fd6c825",
	measurementId: "G-3Z0LL2NE50"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;