"use server"

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { getCustomerById } from "@/actions/customer"
import { getProductById } from "@/actions/product"
import { db } from "@/lib/firebase"
import { Customer, Order, OrderItem, OrderSnapshot } from "@/lib/types"

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
    paymentMethod: order.paymentMethod,
    isNeedToBeShip: order.isNeedToBeShip,
    isShipped: order.isShipped,
    createdAt: new Date(),
    items,
    customerId: order.customer ? order.customer.id : null,
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

      let customer: Customer | null = null
      if (orderSnapshot.customerId) {
        customer = await getCustomerById(orderSnapshot.customerId)
      }

      const items = (await Promise.all(
        orderSnapshot.items.map(async (item) => {
          const product = await getProductById(item.id)
          const orderItem: OrderItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            categoryId: product.category.id,
            quantity: item.quantity,
          }

          return orderItem
        })
      )) as OrderItem[]

      const order: Order = {
        id: orderSnapshot.id,
        visualId: orderSnapshot.visualId,
        paymentMethod: orderSnapshot.paymentMethod,
        isNeedToBeShip: orderSnapshot.isNeedToBeShip,
        isShipped: orderSnapshot.isShipped,
        createdAt: orderSnapshot.createdAt.toDate(),
        items,
        customer,
      }

      return order
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
