"use client"

import { useState } from "react"
import { Button } from "../button"
import { Input } from "../input"
import { Label } from "../label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/atoms"
import { ToastAction } from "@radix-ui/react-toast"
import { useToast } from "./toast-context" 
export default function ToastDemo() {
  const { toast } = useToast() 
  const [name, setName] = useState("")

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "This is a success toast notification.",
      variant: "default",
    })
  }

  const showErrorToast = () => {
    toast({
      title: "Error!",
      description: "This is an error toast notification.",
      variant: "destructive",
    })
  }

  const showCustomToast = () => {
    if (name) {
      toast({
        title: `Hello, ${name}!`,
        description: "This is a custom toast with your name.",
        action: (
          <ToastAction altText="Try again">Try again</ToastAction>
        ),
      })
    } else {
      toast({
        title: "Name is required",
        description: "Please enter your name to see the custom toast.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Toast Notification Demo</CardTitle>
        <CardDescription>Click the buttons to see different types of toast notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={showSuccessToast} variant="default">Show Success Toast</Button>
          <Button onClick={showErrorToast} variant="destructive">Show Error Toast</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={showCustomToast} className="w-full">Show Custom Toast</Button>
      </CardFooter>
    </Card>
  )
}
