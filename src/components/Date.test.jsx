/**
 * @file CalendarForm.test.jsx
 * Jest + React Testing Library tests for the composite CalendarForm (reservation → customer info)
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom";
// ---- Mocks ----

// sonner: wir prüfen nur, dass toast() aufgerufen wird
jest.mock("sonner", () => ({
  toast: jest.fn(),
}))

// Button minimal halten (behaltet Props/children)
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}))

// Popover ohne Portals/Layer
jest.mock("@/components/ui/popover", () => {
  const Popover = ({ children }) => <div data-testid="popover">{children}</div>
  const PopoverTrigger = ({ children }) => <div data-testid="popover-trigger">{children}</div>
  const PopoverContent = ({ children }) => <div data-testid="popover-content">{children}</div>
  return { Popover, PopoverTrigger, PopoverContent }
})

// Calendar: einfacher Button, der bei Klick ein Date an onSelect übergibt
jest.mock("@/components/ui/calendar", () => {
  const Calendar = ({ onSelect }) => (
    <button
      type="button"
      aria-label="Mock Calendar Pick"
      onClick={() => onSelect?.(new Date("2025-12-24"))}
    >
      Pick 2025-12-24
    </button>
  )
  return { Calendar }
})

// Select & Co.: sehr leichte Mocks; wir interagieren nicht aktiv damit,
// verlassen uns auf den Default-Wert aus RHF (diners: "2")
jest.mock("@/components/ui/select", () => {
  const Select = ({ children }) => <div data-testid="select">{children}</div>
  const SelectTrigger = ({ children, ...props }) => (
    <button type="button" {...props}>{children}</button>
  )
  const SelectContent = ({ children }) => <div>{children}</div>
  const SelectGroup = ({ children }) => <div>{children}</div>
  const SelectLabel = ({ children }) => <div>{children}</div>
  const SelectValue = ({ placeholder }) => <span>{placeholder}</span>
  const SelectItem = ({ children }) => <div>{children}</div>
  return { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectValue, SelectItem }
})

// Input minimal lassen (shadcn Input wrappen)
jest.mock("./ui/input", () => ({
  Input: ({ ...props }) => <input {...props} />,
}), { virtual: true })

// ---- Komponente importieren (nach den Mocks!) ----
import CalendarForm from "./Date.jsx"
import { toast } from "sonner"

describe("CalendarForm (Reservation → Customer) with Jest", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders reservation form and shows core fields", () => {
    render(<CalendarForm />)

    // Time-Label + Eingabefeld
    expect(screen.getByText(/time/i)).toBeInTheDocument()
    const timeInput = screen.getByLabelText(/time/i)
    expect(timeInput).toHaveAttribute("type", "time")
    expect(timeInput).toHaveValue("10:30:00")

    // Submit vorhanden
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument()
  })

  it("submits reservation form, calls toast, and renders customer form (conditional rendering)", async () => {
    const user = userEvent.setup()
    render(<CalendarForm />)

    // Optional: Datum aktiv setzen über den Mock-Calendar
    await user.click(screen.getByLabelText(/mock calendar pick/i))

    // Optional: Zeit ändern
    const timeInput = screen.getByLabelText(/time/i)
    await user.clear(timeInput)
    await user.type(timeInput, "19:45:00")

    // Submit Reservation
    await user.click(screen.getByRole("button", { name: /^submit$/i }))

    // Erwartung: toast wurde aufgerufen
    expect(toast).toHaveBeenCalled()
    const [titleArg] = toast.mock.calls[0]
    expect(String(titleArg)).toMatch(/reservation submitted/i)

    // Erwartung: bedingtes Rendering → Customer-Form sichtbar
    expect(screen.getByText(/first name/i)).toBeInTheDocument()
    expect(screen.getByText(/last name/i)).toBeInTheDocument()
    expect(screen.getByText(/email/i)).toBeInTheDocument()
  })

  it("completes customer form and triggers second toast", async () => {
    const user = userEvent.setup()
    render(<CalendarForm />)

    // Direkt submitten (dob/time/diners haben Defaults, Validierung passt)
    await user.click(screen.getByRole("button", { name: /^submit$/i }))

    // Customer-Form sollte da sein
    const firstName = screen.getByLabelText(/first name/i)
    const lastName = screen.getByLabelText(/last name/i)
    const email = screen.getByLabelText(/email/i)

    await user.type(firstName, "Ada")
    await user.type(lastName, "Lovelace")
    await user.type(email, "ada@example.com")

    // Submit Customer-Form
    // Achtung: es gibt jetzt einen zweiten Submit-Button (im zweiten Formular)
    const buttons = screen.getAllByRole("button", { name: /^submit$/i })
    await user.click(buttons[0] ?? buttons) // erster (einziger) sichtbarer in diesem Kontext

    // Nun sollten zwei Toast-Aufrufe erfolgt sein:
    // 1) Reservation submitted
    // 2) Customer info submitted
    expect(toast).toHaveBeenCalledTimes(2)
    const secondTitle = toast.mock.calls[1][0]
    expect(String(secondTitle)).toMatch(/customer info submitted/i)
  })
})