import type { Order } from '../types.ts'

const KEY = 'chai-kef.orders'
const LEGACY = 'havenwild.orders'

function read(): Order[] {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Order[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveOrder(order: Order) {
  const next = [order, ...read().filter((item) => item.id !== order.id)].slice(0, 20)
  localStorage.setItem(KEY, JSON.stringify(next))
}

export function getOrder(id: string) {
  return read().find((item) => item.id === id)
}

export function createOrderId() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `CK-${n}`
}
