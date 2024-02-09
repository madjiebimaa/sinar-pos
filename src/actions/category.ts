"use server"

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { db } from "@/lib/firebase"
import { Category } from "@/lib/types"

export async function getCategoryById(id: Category["id"]): Promise<Category> {
  const querySnapshot = await getDoc(doc(db, "categories", id))

  return {
    id: querySnapshot.id,
    ...querySnapshot.data(),
  } as Category
}

export async function getCategoryByName(
  name: Category["name"]
): Promise<Category> {
  const q = query(collection(db, "categories"), where("name", "==", name))
  const querySnapshot = await getDocs(q)
  const categoryDoc = querySnapshot.docs[0]

  return {
    id: categoryDoc.id,
    ...categoryDoc.data(),
  } as Category
}

export async function getCategories(): Promise<Category[]> {
  const q = query(collection(db, "categories"), orderBy("name", "asc"))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Category)
  )
}
