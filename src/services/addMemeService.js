import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadFile } from "./cloudinaryService";
import { authService } from "./authService";

export const addMemeService = {
  async saveMeme(title, file = null, videoUrl = null) {
    if (!title) throw new Error("Título é obrigatório");

    const currentUser = await authService.getCurrentUser();
    if (!currentUser) throw new Error("Usuário não está logado");

    const userData = await authService.getUserData(currentUser.uid);

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
      createdAt: new Date(),
      userId: currentUser.uid,
      userName: userData.username,
      userAvatar: userData.avatarId,
      likes:0,
      likedBy: []

    });

    return { id: docRef.id, url };
  }
};
