import {auth, db} from "./firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup, 
} from "firebase/auth";
import {doc, setDoc, getDoc, serverTimestamp} from "firebase/firestore";

 const USERS_COLLECTION = "users";

export const authService = {
    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            const userData = await this.getUserData(firebaseUser.uid);

            return {
                uid: firebaseUser.uid,
                email: userData.email,
                name: userData.username,
                avatar: userData.avatarId
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async register(email, password, username, avatarId) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, USERS_COLLECTION, user.uid), {
                uid: user.uid,
                email,
                username,
                avatarId,
                createdAt: serverTimestamp(),
                isActive: true
            });

            await auth.signOut();

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
    },

  async resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  },

   async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
        
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            const userRef = doc(db, USERS_COLLECTION, user.uid);
            const userDoc = await getDoc(userRef);
            
            if (!userDoc.exists()) {
                // Usuário novo - cria o perfil
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName || user.email.split('@')[0],
                    avatarId: 7, 
                    provider: 'google',
                    createdAt: serverTimestamp(),
                    isActive: true
                });
        
                console.log("✅ Novo usuário Google cadastrado:", user.email);
                
            }

            const userData = await this.getUserData(user.uid);

            return {
                uid: user.uid,
                email: userData.email,
                name: userData.username,
                avatar: userData.avatarId,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

