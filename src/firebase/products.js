import {
  collection, doc, getDocs, getDoc,
  addDoc, updateDoc, deleteDoc,
  query, orderBy, where, serverTimestamp
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION = 'products'

// 获取所有产品
export async function getProducts() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// 获取单个产品
export async function getProduct(id) {
  const snap = await getDoc(doc(db, COLLECTION, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// 获取可见产品（前台用）
export async function getVisibleProducts() {
  const q = query(
    collection(db, COLLECTION),
    where('visible', '==', true),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// 新增产品
export async function addProduct(data) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    visible: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

// 更新产品
export async function updateProduct(id, data) {
  return updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// 删除产品
export async function deleteProduct(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}

// 切换上下架
export async function toggleProductVisibility(id, visible) {
  return updateDoc(doc(db, COLLECTION, id), {
    visible,
    updatedAt: serverTimestamp(),
  })
}
