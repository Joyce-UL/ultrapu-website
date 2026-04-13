import {
  collection, doc, getDocs, getDoc,
  addDoc, updateDoc, deleteDoc,
  query, orderBy, where, serverTimestamp
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION = 'blog_posts'

// 获取所有文章（后台用）
export async function getBlogPosts() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// 获取已发布文章（前台用）
export async function getPublishedPosts() {
  const q = query(
    collection(db, COLLECTION),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// 获取单篇文章
export async function getBlogPost(id) {
  const snap = await getDoc(doc(db, COLLECTION, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// 新增文章
export async function addBlogPost(data) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    published: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

// 更新文章
export async function updateBlogPost(id, data) {
  return updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// 删除文章
export async function deleteBlogPost(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}

// 发布/取消发布
export async function togglePublish(id, published) {
  return updateDoc(doc(db, COLLECTION, id), {
    published,
    publishedAt: published ? serverTimestamp() : null,
    updatedAt: serverTimestamp(),
  })
}
