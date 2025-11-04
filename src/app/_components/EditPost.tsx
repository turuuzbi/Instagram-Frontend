import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostType } from "../selfposts/page";
import { useUser } from "@/providers/AuthProvider";

export type EditPostDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedPost: PostType;
};

export const EditPostDialog = ({
  isOpen,
  setIsOpen,
  selectedPost,
}: EditPostDialogProps) => {
  const { token } = useUser();
  const [caption, setCaption] = useState(selectedPost.caption);

  const handleEdit = async () => {
    await fetch(`http://localhost:5555/post/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption,
        postId: selectedPost._id,
      }),
    });
    setIsOpen(false);
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5555/post/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: selectedPost._id,
      }),
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit caption</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Edit your caption..."
          />

          <div className="flex justify-between gap-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit}>Edit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
