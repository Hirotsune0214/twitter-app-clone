import * as firebase from "firebase/app"
// import "firebase/auth"
// import "firebase/firestore"
// import "firebase/storage"
import { getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// .envの環境変数を割り当てる
const firebaseConfig = {  
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_ID,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId:process.env.REACT_APP_FIREBASE_APP_ID,
  };

  // appの初期化
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // 下記をどこでも使えるようにexportしておく
  // 8:05
  export const db = getFirestore(firebaseApp)
  export const auth = getAuth(firebaseApp)
  // storageのgetFirestore(firebaseApp)が合っているか不明
  export const storage = getStorage(firebaseApp)
  // googleの認証機能
  export const provider = new GoogleAuthProvider();