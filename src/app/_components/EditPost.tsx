import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { PostType } from "../selfposts/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [caption, setCaption] = useState(selectedPost.caption);

  const handleEdit = async () => {
    // handle your backend edit request here
    console.log("edit caption:", caption);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    // handle your backend delete request here
    console.log("delete post:", selectedPost._id);
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
