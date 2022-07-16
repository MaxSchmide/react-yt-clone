import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
const app = initializeApp({
	apiKey: "AIzaSyAluD2TtI526pch_afNK8aZLdb_8SqCEfw",
  authDomain: "clone-d7461.firebaseapp.com",
  projectId: "clone-d7461",
  storageBucket: "clone-d7461.appspot.com",
  messagingSenderId: "1098608063705",
  appId: "1:1098608063705:web:f7b4afabc552de4277fac8"
})
export const auth = getAuth(app)
export default app
