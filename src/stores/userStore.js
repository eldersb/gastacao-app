import { defineStore } from 'pinia'
import { getAvatarById } from "@/utils/avatars";

export const useUserStore = defineStore('user', {
  state: () => ({
    name: "teste",
    email: "teste",
    avatar: 1,
    avatarUrl: null
  }),
  actions: {
    setUser(user) {
      this.name = user.name
      this.email = user.email
      this.avatar = user.avatar
      this.avatarUrl = getAvatarById(this.avatar)
    },
    clearUser() {
      this.name = ""
      this.email = ""
      this.avatar = null
      this.avatarUrl = null
    }
  }
})

