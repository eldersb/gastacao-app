<template>
  <div class="feed-container">

    <div v-if="loading" class="loading">Carregando memes...</div>

    <div v-else-if="memes.length === 0" class="empty">
      Nenhum meme encontrado 😢
    </div>

    <div v-else class="memes-grid">
      <div 
        v-for="meme in memes" 
        :key="meme.id" 
        class="meme-card"
        @dblclick="toggleLike(meme)"
      >
        <div class="meme-header">
          <img v-if="meme.userAvatar" :src="meme.userAvatar" class="avatar" />
          <span class="username">{{ meme.userName || 'Usuário' }}</span>
        </div>

        <h3>{{ meme.title }}</h3>

        <div class="meme-content">
          <img v-if="meme.type === 'image'" :src="meme.url" alt="Meme" />
          <video v-else-if="meme.type === 'video'" :src="meme.url" controls></video>
          <audio v-else-if="meme.type === 'audio'" :src="meme.url" controls></audio>
        </div>

        <div class="meme-actions">
          <button @click="toggleLike(meme)" class="like-btn">
            <span v-if="meme.liked">❤️</span>
            <span v-else>🤍</span>
          </button>
          <span>{{ meme.likes || 0 }} curtidas</span>
        </div>

        <small>{{ formatDate(meme.createdAt) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../services/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { authService } from "../services/authService";
import { memeService } from "../services/memeService";

const memes = ref([]);
const loading = ref(true);
const currentUser = ref(null);

onMounted(async () => {
  currentUser.value = await authService.getCurrentUser();

  const memesRef = collection(db, "memes");
  const q = query(memesRef, orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    memes.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      liked: doc.data().likedBy?.includes(currentUser.value?.uid) || false
    }));
    loading.value = false;
  });
});

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("pt-BR");
};

const toggleLike = async (meme) => {
  if (!currentUser.value) return alert("Faça login para curtir");

  await memeService.toggleLike(meme.id, currentUser.value.uid);

  meme.likes = meme.liked ? (meme.likes || 0) + 1 : meme.likes - 1;
};
</script>

<style scoped>
.feed-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.loading, .empty {
  text-align: center;
  color: #777;
}

.memes-grid {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

.meme-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 12px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.1s;
}

.meme-card:hover {
  transform: translateY(-2px);
}

.meme-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: bold;
}

.meme-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.meme-content img,
.meme-content video {
  max-width: 100%;
  border-radius: 8px;
}

.meme-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.like-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
}
</style>
