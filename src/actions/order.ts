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
import { AddOrderParams } from "@/lib/params"
import { Customer, Order, OrderItem, OrderSnapshot } from "@/lib/types"

export async function getOrderCount(): Promise<number> {
  const snapshot = await getCountFromServer(collection(db, "orders"))
  const { count } = snapshot.data()

  return count
}

export async function addOrder(params: AddOrderParams): Promise<void> {
  const items = params.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }))
  
  await addDoc(collection(db, "orders"), {
    visualId: params.visualId,
    paymentMethod: params.paymentMethod,
    isNeedToBeShip: params.isNeedToBeShip,
    isShipped: params.isShipped,
    shipTransportation: params.shipTransportation,
    shipAddress: params.shipAddress,
    createdAt: new Date(),
    items,
    customerId: params.customer ? params.customer.id : null,
  })

  revalidatePath("/orders")
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
            category: product.category,
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
        shipTransportation: orderSnapshot.shipTransportation,
        shipAddress: orderSnapshot.shipAddress,
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
