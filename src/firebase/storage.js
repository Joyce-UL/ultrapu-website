import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './config'

/**
 * Upload an image to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The path in storage (e.g., 'products/image.jpg')
 * @param {function} onProgress - Optional progress callback (0-100)
 * @returns {Promise<string>} - The download URL
 */
export async function uploadImage(file, path, onProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (onProgress) {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress(Math.round(progress))
        }
      },
      (error) => {
        reject(error)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      }
    )
  })
}

/**
 * Upload multiple images
 * @param {File[]} files - Array of files
 * @param {string} folder - The folder path (e.g., 'products/')
 * @param {function} onProgress - Optional progress callback
 * @returns {Promise<string[]>} - Array of download URLs
 */
export async function uploadImages(files, folder, onProgress) {
  const urls = []
  const total = files.length
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const timestamp = Date.now()
    const ext = file.name.split('.').pop()
    const path = `${folder}${timestamp}_${i}.${ext}`
    
    const url = await uploadImage(file, path, (p) => {
      if (onProgress) {
        const overall = ((i + p / 100) / total) * 100
        onProgress(Math.round(overall))
      }
    })
    urls.push(url)
  }
  
  return urls
}

/**
 * Delete an image from Firebase Storage
 * @param {string} url - The download URL of the image
 */
export async function deleteImage(url) {
  try {
    const storageRef = ref(storage, url)
    await deleteObject(storageRef)
  } catch (error) {
    console.warn('Failed to delete image:', error)
  }
}

/**
 * Generate a unique file path for upload
 * @param {string} folder - The folder path
 * @param {string} filename - Original filename
 * @returns {string} - Unique path
 */
export function generatePath(folder, filename) {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const ext = filename.split('.').pop()
  return `${folder}${timestamp}_${random}.${ext}`
}
