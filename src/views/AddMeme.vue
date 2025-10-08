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
        :error-messages="errors.title ? [errors.title] : []"
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

      <!-- Upload de imagem -->
      <div
        v-if="mediaType === 'image'"
        class="upload-area mb-4 d-flex flex-column align-center justify-center"
        @click="triggerUpload('image')"
      >
        <template v-if="imagePreview">
          <div class="preview-wrapper">
            <img :src="imagePreview" class="preview" />
            <v-icon
              class="remove-icon"
              color="red"
              size="28"
              @click.stop="removeImage"
            >
              mdi-close-circle
            </v-icon>
          </div>
        </template>
        <template v-else>
          <v-icon size="40" color="grey">mdi-upload</v-icon>
          <p class="text-grey text-center">Clique para fazer upload</p>
        </template>

        <input
          type="file"
          ref="imageInput"
          class="d-none"
          @change="handleImageChange"
        />
        <span v-if="errors.file" class="text-error text-caption mt-1">{{ errors.file }}</span>
      </div>

      <!-- Upload de áudio -->
      <div
        v-else-if="mediaType === 'audio'"
        class="upload-area mb-4 d-flex flex-column align-center justify-center"
        @click="triggerUpload('audio')"
      >
        <template v-if="audioPreview">
          <div class="preview-wrapper-audio">
            <audio :src="audioPreview" controls></audio>
            <v-icon
              class="remove-icon-audio"
              color="red"
              size="28"
              @click.stop="removeAudio"
            >
              mdi-close-circle
            </v-icon>
          </div>
        </template>
        <template v-else>
          <v-icon size="40" color="grey">mdi-upload</v-icon>
          <p class="text-grey text-center">Clique para fazer upload</p>
        </template>

        <input
          type="file"
          ref="audioInput"
          class="d-none"
          @change="handleAudioChange"
        />
        <span v-if="errors.file" class="text-error text-caption mt-1">{{ errors.file }}</span>
      </div>

      <!-- Campo de URL (vídeo) -->
      <v-text-field
        v-if="mediaType === 'video'"
        v-model="videoUrl"
        label="URL do Vídeo"
        placeholder="Cole a URL do vídeo (YouTube, etc.)"
        variant="outlined"
        class="mb-4"
        :error-messages="errors.videoUrl ? [errors.videoUrl] : []"
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

      <!-- Dialog -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-center" :class="dialogSuccess ? 'text-green' : 'text-red'">
            {{ dialogSuccess ? 'Sucesso' : 'Erro' }}
          </v-card-title>
          <v-card-text>{{ dialogMessage }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
      imageFile: null,
      imagePreview: null,
      audioFile: null,
      audioPreview: null,
      videoUrl: "",
      mediaType: "image",

      dialog: false,
      dialogMessage: "",
      dialogSuccess: false,

      errors: {
        title: "",
        file: "",
        videoUrl: "",
      },
    };
  },
  methods: {
    triggerUpload(type) {
      if (type === "image" && this.$refs.imageInput) this.$refs.imageInput.click();
      if (type === "audio" && this.$refs.audioInput) this.$refs.audioInput.click();
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      if (!file || !file.type.startsWith("image/")) {
        this.dialogMessage = "Apenas arquivos de imagem são permitidos!";
        this.dialogSuccess = false;
        this.dialog = true;
        return;
      }
      this.imageFile = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    removeImage() {
      this.imageFile = null;
      this.imagePreview = null;
      if (this.$refs.imageInput) this.$refs.imageInput.value = null;
    },

    handleAudioChange(event) {
      const file = event.target.files[0];
      if (!file || !file.type.startsWith("audio/")) {
        this.dialogMessage = "Apenas arquivos de áudio são permitidos!";
        this.dialogSuccess = false;
        this.dialog = true;
        return;
      }
      this.audioFile = file;
      this.audioPreview = URL.createObjectURL(file);
    },
    removeAudio() {
      this.audioFile = null;
      this.audioPreview = null;
      if (this.$refs.audioInput) this.$refs.audioInput.value = null;
    },

    async publishMeme() {
      // Reset erros
      this.errors.title = "";
      this.errors.file = "";
      this.errors.videoUrl = "";

      // Validações
      if (!this.title) this.errors.title = "O título é obrigatório.";
      if (this.mediaType === "video" && !this.videoUrl) this.errors.videoUrl = "A URL do vídeo é obrigatória.";
      if (this.mediaType === "image" && !this.imageFile) this.errors.file = "É necessário enviar uma imagem.";
      if (this.mediaType === "audio" && !this.audioFile) this.errors.file = "É necessário enviar um áudio.";

      if (this.errors.title || this.errors.file || this.errors.videoUrl) {
        this.dialogMessage = "Preencha todos os campos obrigatórios antes de publicar.";
        this.dialogSuccess = false;
        this.dialog = true;
        return;
      }

      try {
        let id;
        if (this.mediaType === "video") {
          id = await addMemeService.saveMeme(this.title, null, this.videoUrl);
        } else if (this.mediaType === "image") {
          id = await addMemeService.saveMeme(this.title, this.imageFile);
        } else if (this.mediaType === "audio") {
          id = await addMemeService.saveMeme(this.title, this.audioFile);
        }

        this.dialogMessage = "Meme publicado com sucesso!";
        this.dialogSuccess = true;
        this.dialog = true;

        // Reset
        this.title = "";
        this.imageFile = null;
        this.imagePreview = null;
        this.audioFile = null;
        this.audioPreview = null;
        this.videoUrl = "";

        if (this.$refs.imageInput) this.$refs.imageInput.value = null;
        if (this.$refs.audioInput) this.$refs.audioInput.value = null;

      } catch (error) {
        console.error(error);
        this.dialogMessage = "Erro ao publicar meme!";
        this.dialogSuccess = false;
        this.dialog = true;
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
  gap: 16px;
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

.preview-wrapper,
.preview-wrapper-audio {
  position: relative;
  display: inline-block;
}

.preview {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
}

.remove-icon,
.remove-icon-audio {
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
}

.btn-meme {
  border: 2px solid transparent;
  border-radius: 12px;
  background-color: #18a3ff;
  overflow: hidden;
  color: white;
}
</style>


