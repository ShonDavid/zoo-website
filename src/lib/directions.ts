import { getLocation, mapEdges } from '../data/locations.ts'

export interface MapPoint {
  x: number
  y: number
}

function neighbors() {
  const graph = new Map<string, string[]>()
  for (const [a, b] of mapEdges) {
    const left = graph.get(a) ?? []
    left.push(b)
    graph.set(a, left)
    const right = graph.get(b) ?? []
    right.push(a)
    graph.set(b, right)
  }
  return graph
}

export function shortestPath(from: string, to: string) {
  if (from === to) return [from]
  const graph = neighbors()
  const dist = new Map<string, number>([[from, 0]])
  const prev = new Map<string, string | null>([[from, null]])
  const queue = new Set(graph.keys())

  while (queue.size > 0) {
    let current: string | null = null
    let best = Number.POSITIVE_INFINITY
    for (const node of queue) {
      const score = dist.get(node) ?? Number.POSITIVE_INFINITY
      if (score < best) {
        best = score
        current = node
      }
    }
    if (!current || best === Number.POSITIVE_INFINITY) break
    queue.delete(current)
    if (current === to) break
    const currentLocation = getLocation(current)
    for (const next of graph.get(current) ?? []) {
      const nextLocation = getLocation(next)
      if (!currentLocation || !nextLocation) continue
      const weight = Math.hypot(currentLocation.x - nextLocation.x, currentLocation.y - nextLocation.y)
      const alt = best + weight
      if (alt < (dist.get(next) ?? Number.POSITIVE_INFINITY)) {
        dist.set(next, alt)
        prev.set(next, current)
      }
    }
  }

  if (!prev.has(to)) return [from, to]
  const path: string[] = []
  let cursor: string | null = to
  const seen = new Set<string>()
  while (cursor) {
    if (seen.has(cursor)) break
    seen.add(cursor)
    path.push(cursor)
    cursor = prev.get(cursor) ?? null
  }
  path.reverse()
  return path
}

function toPoint(id: string): MapPoint | null {
  const location = getLocation(id)
  return location ? { x: location.x, y: location.y } : null
}

export function routeBetween(from: string, to: string) {
  return shortestPath(from, to).map(toPoint).filter((point): point is MapPoint => point !== null)
}

export function routeThrough(stopIds: string[]) {
  const points: MapPoint[] = []
  if (stopIds.length === 0) return points
  if (stopIds.length === 1) {
    const only = toPoint(stopIds[0] ?? '')
    return only ? [only] : []
  }
  for (let index = 0; index < stopIds.length - 1; index += 1) {
    const from = stopIds[index]
    const to = stopIds[index + 1]
    if (!from || !to) continue
    const segment = routeBetween(from, to)
    if (points.length > 0) segment.shift()
    points.push(...segment)
  }
  return points
}

export function walkMinutes(points: MapPoint[]) {
  let distance = 0
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]
    const current = points[index]
    if (!previous || !current) continue
    distance += Math.hypot(current.x - previous.x, current.y - previous.y)
  }
  return Math.max(1, Math.round(distance / 110))
}
