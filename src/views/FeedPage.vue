<template>
  <div class="feed">
    <h2>Feed</h2>

    <div v-if="loading">Carregando posts...</div>

    <div v-for="post in posts" :key="post.id" class="post">
      <Post :post="post" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/services/firebase";
import Post from "@/components/Post.vue";

const posts = ref([]);
const loading = ref(true);

onMounted(() => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    posts.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
  });
});
</script>

<style scoped>
.feed {
  max-width: 600px;
  margin: auto;
}
.post {
  margin-bottom: 20px;
}
</style>
