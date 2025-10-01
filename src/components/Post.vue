<template>
  <div class="post-card">
    <p><strong>{{ post.userId }}</strong></p>
    <p>{{ post.caption }}</p>

    <div v-if="post.mediaType === 'image'">
      <img :src="post.mediaUrl" class="media" />
    </div>
    <div v-else-if="post.mediaType === 'video'">
      <video controls class="media">
        <source :src="post.mediaUrl" type="video/mp4" />
      </video>
    </div>
    <div v-else-if="post.mediaType === 'audio'">
      <audio controls>
        <source :src="post.mediaUrl" type="audio/mpeg" />
      </audio>
    </div>

    <div class="likes">
      ❤️ {{ post.likes?.length || 0 }} curtidas
    </div>

    <div class="comments">
      <p v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.userId }}:</strong> {{ comment.text }}
      </p>
    </div>

    <div class="add-comment">
      <input v-model="newComment" placeholder="Escreva um comentário..." />
      <button @click="addComment">Enviar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const props = defineProps({
  post: { type: Object, required: true },
});

const comments = ref([]);
const newComment = ref("");

onMounted(() => {
  const q = query(
    collection(db, "posts", props.post.id, "comments"),
    orderBy("createdAt", "asc")
  );
  onSnapshot(q, (snapshot) => {
    comments.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
});

const addComment = async () => {
  if (!newComment.value) return;
  await addDoc(collection(db, "posts", props.post.id, "comments"), {
    userId: "userID", // Substitua pelo ID  
    text: newComment.value,
    createdAt: serverTimestamp(),
  });
  newComment.value = "";
};
</script>

<style scoped>
.post-card {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.media {
  max-width: 100%;
  border-radius: 8px;
  margin: 10px 0;
}
.likes {
  font-size: 14px;
  margin: 5px 0;
}
.comments {
  margin-top: 8px;
  font-size: 14px;
}
.add-comment {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}
.add-comment input {
  flex: 1;
  padding: 6px;
}
</style>
