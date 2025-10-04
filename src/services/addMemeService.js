import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadFile } from "./cloudinaryService";

export const addMemeService = {
  async saveMeme(title, file = null, videoUrl = null) {
    if (!title) throw new Error("Título é obrigatório");

    let url = null;
    let type = "image";

    if (file) {
      url = await uploadFile(file);
      type = file.type.startsWith("audio/") ? "audio" : "image";
    } else if (videoUrl) {
      url = videoUrl;
      type = "video";
    } else {
      throw new Error("É necessário enviar um arquivo ou uma URL de vídeo");
    }

    const docRef = await addDoc(collection(db, "memes"), {
      title,
      url,
      type,
      createdAt: new Date()
    });

    return { id: docRef.id, url };
  }
};
