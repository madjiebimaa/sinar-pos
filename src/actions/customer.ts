"use server"

import {
  DocumentData,
  Query,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/firebase"
import { Customer } from "@/lib/types"

export async function getCustomerById(id: Customer["id"]): Promise<Customer> {
  const querySnapshot = await getDoc(doc(db, "customers", id))

  return {
    id: querySnapshot.id,
    ...querySnapshot.data(),
  } as Customer
}

function applyFilters(
  q: Query<DocumentData, DocumentData>,
  { name }: { name?: string }
) {
  if (name) {
    q = query(
      q,
      where("queryName", ">=", name),
      where("queryName", "<=", name + "~")
    )
  }

  return q
}

export async function getCustomers(filters: {
  name?: string
}): Promise<Customer[]> {
  let q = query(collection(db, "customers"), orderBy("name", "asc"))
  q = applyFilters(q, filters)
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((customerDoc) => ({
    id: customerDoc.id,
    ...customerDoc.data(),
  })) as Customer[]
}

export async function addCustomer(name: Customer["name"]): Promise<Customer> {
  const customer = {
    name,
    queryName: name.toLowerCase(),
  }
  const customerDoc = await addDoc(collection(db, "customers"), customer)

  revalidatePath("/mobile/order")
  revalidatePath("/products")

  return {
    id: customerDoc.id,
    ...customer,
  }
}
