"use client";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Payment, columns } from "./columns";

const data: Payment[] = [
  {
    id: "afdqe",
    amount: 113100,
    status: "pending",
    email: "m@test.com",
  },
  {
    id: "lasjfn14",
    amount: 87391,
    status: "success",
    email: "a@test.com",
  },
  {
    id: "njv3144",
    amount: 113100,
    status: "success",
    email: "abc@test.com",
  },
  {
    id: "lasjfn14",
    amount: 87391,
    status: "success",
    email: "123@test.com",
  },
];

const AccountsPage = () => {
  const newAccount = useNewAccount();
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2"></Plus>
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterkey="email"
            columns={columns}
            data={data}
            onDelete={() => {}}
            disabled={false}
          ></DataTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
