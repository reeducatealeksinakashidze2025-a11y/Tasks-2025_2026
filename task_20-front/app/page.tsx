"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExpenseCategoryMap } from "@/constants/expense-category";
import axiosInstance from "@/lib/axios-instance";
import { Expense } from "@/types/expense";
import { User } from "@/types/user";
import {
  createExpenseSchema,
  CreateExpenseType,
} from "@/validation/create-expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { deleteCookie, getCookie } from "cookies-next";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const token = getCookie("token") as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createExpenseSchema),
  });
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: CreateExpenseType) => {
    try {
      setLoader(true);
      const resp = await axiosInstance.post("/expenses", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status === 201) {
        toast.success("Expense created successfully");
        getAllExpenses();
        reset();
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const currentUser = async (token: string) => {
    try {
      const resp = await axiosInstance.get("/auth/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(resp.data);
    } catch (e) {
      router.push("/auth/sign-in");
    }
  };

  useEffect(() => {
    if (!token) router.push("/auth/sign-in");
    currentUser(token);
  }, []);

  const handleLogOut = () => {
    deleteCookie("token");
    router.push("/auth/sign-in");
  };

  const getAllExpenses = async () => {
    const resp = await axiosInstance.get("/expenses");
    setExpenses(resp.data);
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const resp = await axiosInstance.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status === 200) {
        getAllExpenses();
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  if (!user) return;

  return (
    <div className="p-4">
      <h1 className="text-center">Home Page</h1>
      <p className="font-bold">
        {user.firstName} {user.lastName}
      </p>
      <p className="font-bold">{user.email}</p>
      <Button onClick={handleLogOut}>Log out</Button>

      <Card className="w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  {...register("productName")}
                  id="productName"
                  type="text"
                  placeholder="shopping"
                  required
                />
                {errors.productName?.message && (
                  <p className="text-red-500">{errors.productName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  {...register("category")}
                  className="border rounded-md p-2"
                >
                  <option value="">Select category</option>
                  <option value={1}>ELECTRONICS</option>
                  <option value={2}>CLOTHING</option>
                  <option value={3}>FURNITURE</option>
                  <option value={4}>GROCERIES</option>
                  <option value={5}>BOOKS</option>
                  <option value={6}>ENTERTAINMENT</option>
                  <option value={7}>TRANSPORT</option>

                  <option value={8}>UTILITIES</option>

                  <option value={9}>DINING</option>
                  <option value={10}>OTHER</option>
                </select>
                {errors.category?.message && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">price</Label>
                <Input
                  {...register("price")}
                  id="price"
                  type="number"
                  placeholder="300"
                  required
                />
                {errors.price?.message && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  {...register("quantity")}
                  id="age"
                  type="number"
                  placeholder="22"
                  required
                />
                {errors.quantity?.message && (
                  <p className="text-red-500">{errors.quantity.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-4">
            {loader ? (
              <Button disabled={loader}>
                {" "}
                <Loader2 className="animate-spin" />{" "}
              </Button>
            ) : (
              <Button type="submit" className={"w-full"}>
                Create Expense
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {expenses.length &&
          expenses.map((expense: Expense) => (
            <div key={expense._id} className="border-2 rounded-3xl p-4">
              <h2>{expense.productName}</h2>
              <h2>{ExpenseCategoryMap[expense.category] ?? "UNKNOWN"}</h2>
              <h2>{expense.price}</h2>
              <p>By @{expense.user.email}</p>
              {(expense.user._id === user._id || user.role === 'admin') && (
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(expense._id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
