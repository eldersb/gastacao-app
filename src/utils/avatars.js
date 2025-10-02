export const avatars = [
    {id: 1, src: require("@/assets/avatars/avatar1.png")},
    {id: 2, src: require("@/assets/avatars/avatar2.jpg")},
    {id: 3, src: require("@/assets/avatars/avatar3.jpg")},
    {id: 4, src: require("@/assets/avatars/avatar4.webp")},
    {id: 5, src: require("@/assets/avatars/avatar5.jpg")},
    {id: 6, src: require("@/assets/avatars/avatar6.jpg")}
];

export function getAvatarById(id) {
    return avatars.find(a => a.id === id) || null;
}
