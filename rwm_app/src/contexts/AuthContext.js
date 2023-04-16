import app from "./Firebase";
import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AuthContext = React.createContext();
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore(app);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);
  // create loading state and share to other components.
  const [isLoading, setIsLoading] = useState(false);

  const [hasLoaded, setHasLoaded] = useState(false);
  // comet chat.
  const [cometChat, setCometChat] = useState(null);
  // posts
  const [wallPosts, setWallPosts] = useState([]);
  // selected user / group.
  const [selectedContact, setSelectedContact] = useState(null);
  // check chat layout should be shown, or not.
  const [isChatLayoutShown, setIsChatLayoutShown] = useState(false);

  function signup(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (cred) => {
        const usersCollection = collection(db, "users");
        const userDocRef = doc(usersCollection, cred.user.uid);
        return setDoc(userDocRef, {
          userEmail: email,
          userPassword: password,
          userName: displayName,
          createdDate: new Date(),
        });
      }
    );
  }

  // async function login(email, password) {
  //   const signIn = signInWithEmailAndPassword(auth, email, password);
  //   const querySnapshot = await getDocs(collection(db, "admins"));
  //   querySnapshot.docs.forEach((doc) => {
  //     signIn.then((data) => {
  //       console.log(data.user.uid);
  //       console.log(doc.id);
  //       if (data.user.uid === doc.id) {
  //         setisAdmin(true);
  //         console.log(isAdmin);
  //       }
  //     });
  //   });
  //   return isAdmin;
  // }

  async function login(email, password) {
    const signIn = signInWithEmailAndPassword(auth, email, password);
    const querySnapshot = await getDocs(collection(db, "admins"));
    const promises = querySnapshot.docs.map((doc) => {
      return signIn.then((data) => {
        if (data.user.uid === doc.id) {
          return true;
        }
        return false;
      });
    });
    const results = await Promise.all(promises);
    const isAdmin = results.includes(true);
    setisAdmin(isAdmin);
    return isAdmin;
  }

  function checkIsAdmin() {
    return isAdmin;
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function setNewName(name) {
    return updateProfile(auth.currentUser, { displayName: name });
  }

  async function uploadPhoto(file, currentUser, setLoading) {
    const fileRef = ref(storage, "profilePics/" + currentUser.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, { photoURL });
    setLoading(false);
    alert("Uploaded file!");
  }

  function setNewEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function setNewPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    setNewEmail,
    setNewPassword,
    setNewName,
    uploadPhoto,
    isAdmin,
    setisAdmin,
    setCurrentUser,
    isLoading,
    setIsLoading,
    hasLoaded,
    setHasLoaded,
    cometChat,
    setCometChat,
    wallPosts,
    setWallPosts,
    selectedContact,
    setSelectedContact,
    isChatLayoutShown,
    setIsChatLayoutShown,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
