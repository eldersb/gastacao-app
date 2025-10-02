import {auth, db} from "./firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {doc, setDoc, getDoc, serverTimestamp} from "firebase/firestore";

const USERS_COLLECTION = "users";

export const authService = {
    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async register(email, password, username, avatarId) {
        try {
            console.log('passou 1')
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, USERS_COLLECTION, user.uid), {
                uid: user.uid,
                email: email,
                username: username,
                avatarId: avatarId,
                createdAt: serverTimestamp(),
                isActive: true
            });


            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getCurrentUser() {
        return auth.currentUser;
    },

    async getUserData(uid) {
        const docRef = doc(db, USERS_COLLECTION, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }
};
