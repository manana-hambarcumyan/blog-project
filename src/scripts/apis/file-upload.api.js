import { Storage } from '../utils/storage.js'

export class FileUpload {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async upload(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);


      const token = Storage.getItem("token");

      const response = await fetch(this.getFullUrl("/file-upload/upload"), {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  getFullUrl(endpoint) {
    // Issue with endpoint
    return `${this.baseUrl}${endpoint}`;
  }
}