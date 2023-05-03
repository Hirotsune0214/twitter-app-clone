import React from 'react';
import { auth } from "../firebase"

/*
userSliceのinitialState: {
    user: {uid:"", photoUrl:"", displayName: ""}
  },の中にあるuidにデータが存在すればFeed.tsxに遷移するようにする
*/

const Feed = () => {
  return (
    <div>Feed
      <button onClick={() => auth.signOut}>Logout</button>
    </div>
  )
}

export default Feed