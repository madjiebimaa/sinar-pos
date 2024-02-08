"use server"

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"

import { db } from "@/lib/firebase"
import { CategorySnapshot, Product, ProductSnapshot } from "@/lib/types"

export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, "products"), orderBy("name", "asc"))
  const querySnapshot = await getDocs(q)

  return Promise.all(
    querySnapshot.docs.map(async (productDoc) => {
      const productSnapshot = {
        id: productDoc.id,
        ...productDoc.data(),
      } as ProductSnapshot

      const categoryDoc = await getDoc(
        doc(db, "categories", productSnapshot.categoryId)
      )

      const categorySnapshot = {
        id: categoryDoc.id,
        ...categoryDoc.data(),
      } as CategorySnapshot

      return {
        id: productSnapshot.id,
        name: productSnapshot.name,
        price: productSnapshot.price,
        category: categorySnapshot,
      }
    })
  )
}