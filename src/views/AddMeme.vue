<template>
  <v-container class="d-flex justify-center pa-4 add-container">
    <v-card width="400" class="pa-4 rounded-xl">
      <v-card-title class="text-center">Criar Novo Meme</v-card-title>

      <!-- Título -->
      <v-text-field
        v-model="title"
        label="Título do Meme"
        placeholder="Digite um título engraçado..."
        counter="100"
        variant="outlined"
        class="mb-3 mt-3"
      ></v-text-field>

      <!-- Tipo de mídia -->
      <v-btn-toggle
        v-model="mediaType"
        mandatory
        class="mb-3 w-100 justify-center media-toggle"
      >
        <v-btn value="image" variant="text" prepend-icon="mdi-image"></v-btn>
        <v-btn value="audio" variant="text" prepend-icon="mdi-music"></v-btn>
        <v-btn value="video" variant="text" prepend-icon="mdi-video"></v-btn>
      </v-btn-toggle>

      <!-- Upload de arquivo (imagem/áudio) -->
      <div
        v-if="mediaType !== 'video'"
        class="upload-area mb-4 d-flex flex-column align-center justify-center"
        @click="triggerUpload"
      >
        <template v-if="previewUrl">
          <img
            v-if="mediaType === 'image'"
            :src="previewUrl"
            class="preview"
          />
          <audio
            v-else-if="mediaType === 'audio'"
            :src="previewUrl"
            controls
          ></audio>
        </template>
        <template v-else>
          <v-icon size="40" color="grey">mdi-upload</v-icon>
          <p class="text-grey text-center">Clique para fazer upload</p>
        </template>

        <input
          type="file"
          ref="fileInput"
          class="d-none"
          @change="handleFileChange"
        />
      </div>

      <!-- Campo de URL (vídeo) -->
      <v-text-field
        v-if="mediaType === 'video'"
        v-model="videoUrl"
        label="URL do Vídeo"
        placeholder="Cole a URL do vídeo (YouTube, etc.)"
        variant="outlined"
        class="mb-4"
      ></v-text-field>

      <!-- Botão publicar -->
      <v-btn
        block
        variant="text"
        class="btn-meme"
        @click="publishMeme"
      >
        Publicar Meme
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { addMemeService } from "@/services/addMemeService";

export default {
  name: "AddMeme",
  data() {
    return {
      title: "",
      file: null,
      previewUrl: null,
      videoUrl: "",
      mediaType: "image",
    };
  },
  methods: {
    triggerUpload() {
      this.$refs.fileInput.click();
    },

    handleFileChange(event) {
      this.file = event.target.files[0];

      if (this.file) {
        this.previewUrl = URL.createObjectURL(this.file);
      }
    },

    async publishMeme() {
      if (!this.title) {
        alert("Por favor, insira um título para o meme.");
        return;
      }

      if (this.mediaType === "video" && !this.videoUrl) {
        alert("Por favor, insira a URL do vídeo.");
        return;
      }

      try {
        let id;

        if (this.mediaType === "video") {
          id = await addMemeService.saveMeme(this.title, null, this.videoUrl);
        } else {
          id = await addMemeService.saveMeme(this.title, this.file);
        }

        alert("Meme publicado com sucesso! ID: " + id);

        this.title = "";
        this.file = null;
        this.previewUrl = null;
        this.videoUrl = "";
        this.$refs.fileInput.value = null;
      } catch (err) {
        console.error(err);
        alert("Erro ao publicar meme!");
      }
    },
  },
};
</script>

<style scoped>
.add-container {
  background-color: #f0f8ff;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.media-toggle {
  border: 2px solid transparent;
  border-radius: 12px;
  background-color: #f0f8ff;
  overflow: hidden;
}

.upload-area {
  border: 2px dashed #bbb;
  border-radius: 8px;
  padding: 30px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  text-align: center;
}

.upload-area:hover {
  background-color: #f5f5f5;
}

.preview {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
}

.btn-meme {
  border: 2px solid transparent;
  border-radius: 12px;
  background-color: #18a3ff;
  overflow: hidden;
  color: white;
}
</style>
