import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CreateBlog = async() => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    cache:"no-store"
  });
  const { data: blogs } = await res.json();

  const handleCreateBlog =()=>{
    
  }

  return (
    <div className="w-9/12 mx-auto py-20">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">All Blogs</h2>
        <Button>Create Blog</Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">{blog.id}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.tags.join(" ,")}</TableCell>
              {/* <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CreateBlog;
