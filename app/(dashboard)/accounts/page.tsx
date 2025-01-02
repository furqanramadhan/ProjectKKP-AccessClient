"use client";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { columns } from "./columns";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

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
            filterkey="name"
            columns={columns}
            data={accounts}
            onDelete={() => {}}
            disabled={false}
          ></DataTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
