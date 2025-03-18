import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, MicOff, LogOut, ArrowRight, Volume2, AlertTriangle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function InterviewQuestion() {
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [transcribedText, setTranscribedText] = useState("")
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false)

  // Mock data - replace with your actual data
  const totalQuestions = 10
  const remainingQuestions = 8
  const currentQuestion = "Have you been accepted by a US institution?"
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    } else {
      setShowTimeUpDialog(true)
    }
  }, [timeLeft])

  const progress = ((totalQuestions - remainingQuestions) / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
      {timeLeft > 0 && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-background shadow-lg border rounded-xl p-4">
            <div className="text-2xl font-bold tabular-nums">
              {timeLeft < 10 && timeLeft > 0 ? (
                <span className="text-destructive">{timeLeft}</span>
              ) : (
                <span>{timeLeft}</span>
              )}
              <span className="text-muted-foreground text-lg ml-1">sec</span>
            </div>
          </div>
        </div>
      )}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Interview Question</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm">
              <div>
                <span className="font-medium text-yellow-600">Total Questions:</span>
                <span className="ml-1 text-muted-foreground">{totalQuestions}</span>
              </div>
              <div>
                <span className="font-medium text-red-500">Remaining:</span>
                <span className="ml-1 text-muted-foreground">{remainingQuestions}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="relative bg-muted/30 p-6 rounded-lg border">
            <p className="text-lg md:text-xl text-foreground">{currentQuestion}</p>
            {isSpeaking && (
              <div className="absolute bottom-4 right-4 text-blue-500 animate-pulse">
                <Volume2 className="h-6 w-6" />
              </div>
            )}
          </div>

          {isRecording && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>Recording in progress...</AlertDescription>
            </Alert>
          )}

          <div className="min-h-[150px] max-h-[250px] overflow-y-auto bg-muted/30 rounded-lg border p-4">
            <p className="text-muted-foreground">
              {transcribedText || "Your answer will appear here..."}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <div className="flex w-full sm:w-auto gap-4">
            <Button
              variant={isRecording ? "destructive" : "default"}
              className={`flex-1 sm:flex-none ${
                isRecording 
                  ? "bg-destructive hover:bg-destructive/90" 
                  : "bg-primary hover:bg-primary/90"
              }`}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <>
                  <MicOff className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Start Recording
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={() => setShowExitDialog(true)}
            >
              <LogOut className="mr-2 h-4 w-4" /> Exit Interview
            </Button>
          </div>
          <Button className="w-full sm:w-auto sm:ml-auto" onClick={() => setTimeLeft(60)}>
            <span>Next Question</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Your progress will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Exit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time&apos;s Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Time is up for this question! Ready to proceed to the next question?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setShowTimeUpDialog(false)
              setTimeLeft(60)
            }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

