"use client"

import * as React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { toast } from "sonner"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const FormSchema = z.object({
  dob: z.date({ required_error: "Please pick a date" }),
  time: z.string().min(1, "Please select a time"),
  diners: z.string().min(1, "Please select number of diners"),
})

// --- Schema für Kundendetails ---
const CustomerSchema = z.object({
  customerFirstName: z.string().min(2, "Please enter your first name"),
  customerLastName: z.string().min(2, "Please enter your last name"),
  customerEmail: z.string().email("Please enter a valid email"),
})


export default function CalendarForm() {
  const [submitted, setSubmitted] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dob: new Date(),
      time: "10:30:00",
      diners: "2",
    },
  })
  
const form2 = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      customerFirstName: "",
      customerLastName: "",
      customerEmail: "",
    },
  })

  function onSubmit2(values) {
    toast("✅ Customer info submitted!", {
      description: (
        <div className="space-y-1">
          <p><strong>First Name:</strong> {values.customerFirstName}</p>
          <p><strong>Last Name:</strong> {values.customerLastName}</p>
          <p><strong>Email:</strong> {values.customerEmail}</p>
        </div>
      ),
    })
  }


  function onSubmit(data) {
    const [hours, minutes, seconds] = data.time.split(":").map(Number)
    const fullDate = new Date(data.dob)
    fullDate.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0, 0)

    const formattedDate = fullDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const formattedTime = fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
    setSubmitted(true);

    toast("✅ Reservation submitted!", {
      description: (
        <div className="space-y-1">
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Time:</strong> {formattedTime}</p>
          <p><strong>Diners:</strong> {data.diners}</p>
        </div>
      ),
    })
  }

  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

  return (
    <>
    {!submitted && (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-3">
        {/* DATE */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="px-1 bg-gray-900">Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        "text-foreground" // <-- Text immer sichtbar
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="text-muted-foreground">Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      startOfDay(date) < startOfDay(new Date("1900-01-01")) ||
                      startOfDay(date) < startOfDay(new Date())
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="bg-gray-900">
                Pick a date for your table reservation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TIME */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel htmlFor="time-picker" className="px-1 bg-gray-900">
                Time
              </FormLabel>
              <FormControl>
                <Input
                  id="time-picker"
                  type="time"
                  step="1"
                  {...field}
                  className={cn(
                    "bg-background text-foreground",
                    "placeholder:text-muted-foreground"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DINERS */}
        <FormField
          control={form.control}
          name="diners"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="px-1 bg-gray-900">Number of Diners</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="min-w-[240px] w-fit text-foreground">
                    <SelectValue placeholder="Number of Diners" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Number of Diners</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="+10">+10</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
                <Button type="submit" className="text-foreground bg-accent hover:bg-white">Submit</Button>
                      </form>
    </Form>
 )}
    {submitted && (
    <Form {...form2}>
      <form onSubmit={form2.handleSubmit(onSubmit2)} className="space-y-6 mt-5">
        {/* First Name */}
        <FormField
          control={form2.control}
          name="customerFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="px-1 bg-gray-900">First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  {...field}
                  className="bg-background text-foreground placeholder:text-muted-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form2.control}
          name="customerLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="px-1 bg-gray-900">Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your last name"
                  {...field}
                  className="bg-background text-foreground placeholder:text-muted-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form2.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="px-1 bg-gray-900">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...field}
                  className="bg-background text-foreground placeholder:text-muted-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                <Button type="submit" className="text-foreground bg-accent hover:bg-white">Submit</Button>

      </form>
    </Form>)
}
</>
  )
}


