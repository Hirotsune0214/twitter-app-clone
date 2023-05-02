import React, { useEffect} from 'react';
import styles from "./App.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout} from "./features/userSlice"
import { auth } from "./firebase"
import Feed from './components/Feed';
import Auth from './components/Auth';


const App: React.FC = () => {
  // reduxのstateの中からuserの値を取得して変数のuserに代入する
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // onAuthStateChangedは、ユーザーに変化(login, logout, ユーザーが変わった場合)があった際に呼ばれ、そのユーザーを監視してくれる
    const unSub = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // 情報のアップデート
        dispatch(login({
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName
        }))
      } else {
        // authユーザーが存在しない場合、ログアウトを実行する
        dispatch(logout());
      }
    },)
    // クリーンアップ関数は、Appコンポーネントがアンマウントされた時に実行される
    return () => {
      unSub();
    }
  }, [dispatch])
  return (
    <>
    {user.uid ? (
      // uidが存在する場合、Feedコンポーネント
      <div className={styles.app}><Feed /></div>
    ) : (
      // uidが存在しない場合、Authコンポーネント
      <Auth />
    )
  }
    </>
      
    
  );
}

export default App;
