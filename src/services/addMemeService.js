import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const addMemeService = {
  async saveMeme(title) {
    if (!title) throw new Error("Título é obrigatório");

    const docRef = await addDoc(collection(db, "memes"), {
      title,
      createdAt: new Date()
    });

    return docRef.id;
  }
};