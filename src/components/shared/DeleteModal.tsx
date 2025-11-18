import { Button } from "@/components/ui/button";
import { TriangleAlertIcon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IBlogs, IProjects, IUser } from "@/types";
import { toast } from "sonner";

interface IProps {
  blog: IBlogs | IUser | IProjects | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "blog" | "user" | "project";
  onSuccess: () => Promise<void>;
}

export function DeleteModal({
  blog,
  open,
  type,
  onOpenChange,
  onSuccess,
}: IProps) {
  console.log("blog", blog);
  const handleDelete = async () => {
    if (!blog) return;

    try {
      const url =
        type === "blog"
          ? `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog.id}`
          : type === "project"
          ? `${process.env.NEXT_PUBLIC_BASE_API}/project/${blog.id}`
          : `${process.env.NEXT_PUBLIC_BASE_API}/user/${blog.id}`;

      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      toast.success(
        type === "blog"
          ? "Blog deleted successfully!"
          : type === "project"
          ? "Project deleted successfully!"
          : "User deleted successfully!"
      );

      await onSuccess();

      onOpenChange(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className='bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
            <TriangleAlertIcon className='text-destructive size-6' />
          </div>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure you want to delete?</DialogTitle>
          <div className="text-center">
            <span className="font-bold">
              {type === "user"
                ? (blog as IUser)?.name
                : (blog as IBlogs | IProjects)?.title}
            </span>
          </div>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
