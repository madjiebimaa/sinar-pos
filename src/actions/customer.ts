"use server"

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
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

export async function getCustomers(): Promise<Customer[]> {
  const q = query(collection(db, "customers"), orderBy("name", "asc"))
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
