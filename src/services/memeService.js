import { db } from "./firebase";
import { doc, runTransaction } from "firebase/firestore";

export const memeService = {
  async toggleLike(memeId, userId) {
    const memeRef = doc(db, "memes", memeId);

    await runTransaction(db, async (transaction) => {
      const memeDoc = await transaction.get(memeRef);
      if (!memeDoc.exists()) throw "Meme não encontrado";

      const likedBy = memeDoc.data().likedBy || [];
      let likes = memeDoc.data().likes || 0;

      if (likedBy.includes(userId)) {

        likes--;
        const index = likedBy.indexOf(userId);
        likedBy.splice(index, 1);
      } else {
  
        likes++;
        likedBy.push(userId);
      }

      transaction.update(memeRef, { likes, likedBy });
    });
  }
};
