const CLOUD_NAME = "dmbflbndc";
const UPLOAD_PRESET = "memes-gastacao"; 

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Erro ao enviar arquivo: " + text);
  }

  const data = await res.json();
  return data.secure_url;
}