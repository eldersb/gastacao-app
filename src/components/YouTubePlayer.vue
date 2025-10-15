<template>
  <div>
    <iframe
        v-if="videoId"
        :src="`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`"
        width="100%"
        height="360"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>
    <div v-else>URL inválida: {{ url }}</div>
  </div>
</template>

<script>
export default {
  name: 'YouTubePlayer',
  props: {
    url: {type: String, required: true}
  },
  computed: {
    videoId() {
      if (!this.url) return null
      const patterns = [
        /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
        /(?:youtu\.be\/)([\w-]{11})/,
        /(?:youtube\.com\/embed\/)([\w-]{11})/,
        /(?:youtube\.com\/shorts\/)([\w-]{11})/
      ]
      for (const p of patterns) {
        const m = this.url.match(p)
        if (m && m[1]) return m[1]
      }
      return null
    }
  }
}
</script>
