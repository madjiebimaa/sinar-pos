"use server"

import {
  DocumentData,
  Query,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { getCategoryById, getCategoryByName } from "@/actions/category"
import { db } from "@/lib/firebase"
import { Product, ProductSnapshot } from "@/lib/types"

export async function getProductById(id: Product["id"]): Promise<Product> {
  const querySnapshot = await getDoc(doc(db, "products", id))

  const productSnapshot = {
    id: querySnapshot.id,
    ...querySnapshot.data(),
  } as ProductSnapshot

  const category = await getCategoryById(productSnapshot.categoryId)

  return {
    id: productSnapshot.id,
    name: productSnapshot.name,
    price: productSnapshot.price,
    category,
  } as Product
}

async function applyFilters(
  q: Query<DocumentData, DocumentData>,
  { name, category }: { name?: string; category?: string }
) {
  if (name) {
    q = query(
      q,
      where("queryName", ">=", name),
      where("queryName", "<=", name + "~")
    )
  }

  if (category) {
    const { id } = await getCategoryByName(category)
    q = query(q, where("categoryId", "==", id))
  }

  return q
}

export async function getProducts(filters: {
  name?: string
  category?: string
}): Promise<Product[]> {
  let q = query(collection(db, "products"), orderBy("queryName", "asc"))
  q = await applyFilters(q, filters)
  const querySnapshot = await getDocs(q)

  return Promise.all(
    querySnapshot.docs.map(async (productDoc) => {
      const product = await getProductById(productDoc.id)

      return product
    })
  )
}
