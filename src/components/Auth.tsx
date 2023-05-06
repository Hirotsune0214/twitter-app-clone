/* Sign in page */
import React, {useState} from 'react';
import styles from "./Auth.module.css"
import { useDispatch } from 'react-redux';
import { auth, db, provider, storage } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword,  } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateUserProfile } from '../features/userSlice';
import { updateProfile } from "firebase/auth";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
} from "@material-ui/core";

 import { createTheme, ThemeProvider,} from '@mui/material/styles';

import SendIcon from '@mui/icons-material/Send';
import CameraIcon from '@mui/icons-material/Camera';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


  const Auth: React.FC = () => {
    // 以下のコードだけよくわからなかったのですが、material uiであれば以下のように書く必要があるかと思います。myComponentは例です！
    // import { makeStyles } from '@mui/styles';

    // const useStyles = makeStyles({
    //   root: {
    //     backgroundColor: 'red',
    //   },
    // });

    // function MyComponent() {
    //   const classes = useStyles();
    //   return <div className={classes.root}>Hello World!</div>;
    // }
    // importしたimport styles from "./Auth.module.css"を使うだけなら、const classes = styles()は不要そうかと！
    // ちょっとここだけ確認をお願いいたします！

    // const classes = styles();


    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // ユーザーがタイピングしたusernameを格納
    const [ username, setUsername] = useState("");
    // ユーザーが選択した画像を格納する
    // 画像はnullかjsで定義されているfile型のどちらかを取れるようにユニオン型
    const [avatarImage, setAvatarImage] = useState<File | null>(null);
    // ログインと登録を判別するためのtrue,falseのstate
    // 最初はtrueでログインモードで表示するようにしておく
    const [isLogin, setIsLogin] = useState(true);

    // ユーザーが画像を選択した時のイベントハンドラー。1つしか選択できない
    // (e.target.files![0])の!は、nullまたはundefinedではないとコンパイラーに伝えている
    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files![0]) {
        setAvatarImage(e.target.files![0]);
        e.target.value= ""
      }
    }


    // ログイン時の関数
    const signInEmail = async () => {
      await signInWithEmailAndPassword(auth, email, password)
    }

    // 登録時の関数
    const signUpEmail = async () => {
      const authUser =  await createUserWithEmailAndPassword(auth, email, password);
      let url = "";
      // 選択されたイメージが存在する場合はfireStorageに格納
      if(avatarImage) {
        // 複数の名前の画像があると削除される仕様(firebase)なのでランダムな画像ネームを作るロジック
        // ランダムな名前を作成するための候補になる
        const S = "abcdfghijklmnopqrstuvwxyzABCDEGHIJLMNOPQRSTUVWXYZ0123456789";
        // 生成したいランダムな文字数
        const N = 16;
        // crypto.getRandomValuesは、JSで乱数を生成してくれる
        // Uint32Arrayで、0-43億の数字が16個個選択される
        const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        // 43億 % 62 = 余りをindexとして取得
        .map((n) => S[n % S.length])
        // "abcdfghijklmnopqrstuvwxyzABCDEGHIJLMNOPQRSTUVWXYZ0123456789"の中から16個取得して文字列としてjoinする
        .join("");
        const fileName = randomChar + "_" + avatarImage.name

        // refでフォルダの階層を指定することができる
        await uploadBytes(ref(storage, `avatars/${fileName}`), avatarImage);

        // 画像の場所をurlで取得する
        // .child(fileName)で今格納したfileNameのオブジェクトを取得
        // .getDownLoadURL()で今アップロードしたurlを取得
        const storageRef = await ref(storage, `avatars/${fileName}`)
        await getDownloadURL(storageRef)
      }

      // authUserのuser属性が存在する場合、firebaseのupdateProfileを使用して更新する
      if (auth.currentUser !== null) {
        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: url,
        });
      }
      dispatch(
        updateUserProfile({
          displayName: username,
          photoUrl: url,
        })
      );
    };


    const signInGoogle = async() => {
     await signInWithPopup(auth, provider).catch((err) => alert(err.message))
    }

    //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });


    const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1682965637063-9e77836fc393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? "Login" : "Register"}
            </Typography>
            {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                // ユーザーがタイピングするたびに、useStateの方に反映させる
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<EmailIcon />}
                onClick={
                  isLogin ? async () => {
                    try {
                      await signInEmail();
                    } catch (err) {
                      if (err instanceof Error) {
                      alert(err.message)
                      }
                    }
                  }
                  : async () => {
                    try {
                      await signUpEmail();
                    } catch (err) {
                      if (err instanceof Error) {
                      alert(err.message)
                      }
                    }
                  }
                }
              >


              {isLogin ? "Login" : "Register"}

              </Button>
              {/* Gridの意味を調べる */}
              <Grid container>
                {/* Grid item xsにすると50 50に並ぶので片方を消すと、もう片方が全体を占めるのでもう片方を右端に寄せることができる */}
                <Grid item xs>
                  <span className={styles.login_reset}>Forgot password?</span>
                </Grid>
                <Grid item>
                  {/* ログイン時は、Create new accountの登録用のページにいくように見せる
                      登録時は、Back to loginでログインのページにいくようにみせる
                  */}
                  {/* テキストが押されるたびに現在のsetIsLoginと反対の値が表示される */}
                  <span className={styles.login_toggleMode} onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create new account ?" : "Back to login"}</span>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                 onClick={signInGoogle}
              >
                SignIn with Google
              </Button>
            </Box>
          {/* </Box> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Auth;
