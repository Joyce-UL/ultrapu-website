import {
  collection, getDocs, addDoc,
  updateDoc, doc,
  query, orderBy, serverTimestamp
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION = 'inquiries'

// 获取所有询盘（后台用）
export async function getInquiries() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// 提交询盘（前台表单用）
export async function submitInquiry(data) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    status: 'new',       // new | read | replied
    createdAt: serverTimestamp(),
  })
}

// 标记已读/已回复
export async function updateInquiryStatus(id, status) {
  return updateDoc(doc(db, COLLECTION, id), { status })
}

// 添加备注
export async function addInquiryNote(id, note) {
  return updateDoc(doc(db, COLLECTION, id), {
    note,
    updatedAt: serverTimestamp(),
  })
}
