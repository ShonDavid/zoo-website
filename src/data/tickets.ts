import type { TicketLine, TicketType, TicketTypeId } from '../types.ts'

export const ticketTypes: TicketType[] = [
  {
    id: 'adult',
    name: 'Adult',
    price: 3400,
    description: 'Ages 13–64. Full grounds, habitats, and keeper talks.',
  },
  {
    id: 'child',
    name: 'Child',
    price: 1900,
    description: 'Ages 3–12. Children under 3 come in free with a paying adult.',
  },
  {
    id: 'senior',
    name: 'Senior',
    price: 2600,
    description: 'Ages 65 and over. Same access, with a calmer arrival window.',
  },
  {
    id: 'student',
    name: 'Student',
    price: 2400,
    description: 'Bring a valid student ID to the gate.',
  },
  {
    id: 'family',
    name: 'Family',
    price: 9600,
    description: 'Two adults and two children. Saves ₪10 against the same tickets bought separately.',
  },
]

export function getTicketType(id: TicketTypeId) {
  return ticketTypes.find((ticket) => ticket.id === id)
}

export function lineTotal(line: TicketLine) {
  return line.quantity * line.unitPrice
}

export function orderTotal(lines: TicketLine[]) {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0)
}
