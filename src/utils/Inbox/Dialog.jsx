import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const InboxDialog = ({ showCompose, setShowCompose, newSubject, setNewSubject, newMessage, setNewMessage, submitting, handleSend }) => {
  return (
    <div>
    <Dialog open={showCompose} onOpenChange={setShowCompose}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="fixed bottom-8 right-8 rounded-full px-8 py-5 shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-3 transition-all duration-200 hover:scale-105 font-semibold text-base"
            title="Compose Notification"
          >
            <Edit2 className="h-6 w-6" />
            <span>Compose</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>
              Enter a subject and message to send.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-1">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Brief title"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Detailed notification text"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowCompose(false)}>
              Cancel
            </Button>
            <Button variant="secondary" className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSend} disabled={submitting}>
              {submitting ? "Sending…" : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
    </div>
  )
}

export default InboxDialog