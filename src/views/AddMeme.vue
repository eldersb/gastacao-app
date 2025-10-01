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
        mandatory
        class="mb-3 w-100 media-toggle"
      >
        <v-btn value="image" variant="text">📷 Imagem</v-btn>
        <v-btn value="audio" variant="text">🎵 Áudio</v-btn>
        <v-btn value="video" variant="text">🎬 Vídeo</v-btn>
      </v-btn-toggle>

      <!-- Upload -->
          <div
        class="upload-area mb-4 d-flex flex-column align-center justify-center"
        @click="triggerUpload"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <v-icon size="40" color="grey">mdi-upload</v-icon>
        <p class="text-grey text-center">Clique para fazer upload </p>
        <input
          type="file"
          ref="fileInput"
          class="d-none"     
        />
      </div>

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
  name: 'AddMeme',
    data() {
    return {
      title: '',
    };
  },
    methods: {
    triggerUpload() {
      this.$refs.fileInput.click(); 
    },

    async publishMeme() {
      if (!this.title) {
        alert('Por favor, insira um título para o meme.');
        return;
      }

      try {
        const id = await addMemeService.saveMeme(this.title);
        alert("Título salvo com sucesso! ID: " + id);
        this.title = "";
      } catch (err) {
        console.error(err);
        alert("Erro ao salvar título!");
      }
    }
  }
}


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
}

.upload-area:hover {
  background-color: #f5f5f5;
}

.btn-meme {
  border: 2px solid transparent; 
  border-radius: 12px;  
  background-color: #18a3ff;     
  overflow: hidden;   
  color: white;
}


</style>