import {defineStore} from 'pinia'
import {getAvatarById} from "@/utils/avatars";

export const useUserStore = defineStore('user', {
    state: () => ({
        name: "",
        email: "",
        avatar: null,
        avatarUrl: null
    }),
    actions: {
        setUser(user) {
            this.name = user.name
            this.email = user.email
            this.avatar = user.avatar
            this.setAvatar(this.avatar)
        },
        clearUser() {
            this.name = ""
            this.email = ""
            this.avatar = null
            this.avatarUrl = null
        },
        setAvatar(avatarId) {
            this.avatarUrl = getAvatarById(avatarId);
        }
    }
})

