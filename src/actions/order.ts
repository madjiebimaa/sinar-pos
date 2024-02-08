"use server"

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { db } from "@/lib/firebase"
import { Order, OrderItem, OrderSnapshot } from "@/lib/types"

export async function getOrderCount(): Promise<number> {
  const snapshot = await getCountFromServer(collection(db, "orders"))
  const { count } = snapshot.data()

  return count
}

export async function addOrder(order: Order): Promise<void> {
  const items = order.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }))
  await addDoc(collection(db, "orders"), {
    visualId: order.visualId,
    items,
    paymentMethod: order.paymentMethod,
    isShipped: order.isShipped,
  })

  redirect("/products")
}

export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, "orders"), orderBy("visualId", "asc"))
  const querySnapshot = await getDocs(q)

  return Promise.all(
    querySnapshot.docs.map(async (orderDoc) => {
      const orderSnapshot = {
        id: orderDoc.id,
        ...orderDoc.data(),
      } as OrderSnapshot

      const items = (await Promise.all(
        orderSnapshot.items.map(async (item) => {
          const productDoc = await getDoc(doc(db, "products", item.id))

          return {
            id: productDoc.id,
            ...productDoc.data(),
            quantity: item.quantity,
          }
        })
      )) as OrderItem[]

      return {
        id: orderSnapshot.id,
        visualId: orderSnapshot.visualId,
        items,
        paymentMethod: orderSnapshot.paymentMethod,
        isShipped: orderSnapshot.isShipped,
      }
    })
  )
}

export async function deleteOrderById(id: Order["id"]): Promise<void> {
  await deleteDoc(doc(db, "orders", id))

  revalidatePath("/orders")
}

export async function shipOrderById(id: Order["id"]): Promise<void> {
  await updateDoc(doc(db, "orders", id), {
    isShipped: true,
  })

  revalidatePath("/orders")
}
