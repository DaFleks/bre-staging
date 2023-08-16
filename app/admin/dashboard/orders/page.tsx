"use client";

import DashboardHeader from "@/components/ui/dashboard-header";
import DashboardStat from "@/components/ui/dashboard-stat";
import DashboardStatWrapper from "@/components/ui/dashboard-stat-wrapper";
import SearchInput from "@/components/ui/search-input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CircleDollarSign,
  EditIcon,
  Hand,
  Loader,
  PackageIcon,
  TrashIcon,
  Truck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminOrders = () => {
  return (
    <>
      <DashboardHeader text="Orders" subtext="View and modify existing orders..." />
      <DashboardStatWrapper>
        <DashboardStat title="Total Orders" stat={22} icon={<PackageIcon className="h-4 w-4" />} />
        <DashboardStat title="Pending" stat={22} icon={<Loader className="h-4 w-4" />} />
        <DashboardStat title="Shipped" stat={22} icon={<Truck className="h-4 w-4" />} />
      </DashboardStatWrapper>
      <DashboardStatWrapper>
        <DashboardStat title="Canceled" stat={22} icon={<XCircle className="h-4 w-4" />} />
        <DashboardStat title="On Hold" stat={22} icon={<Hand className="h-4 w-4" />} />
        <DashboardStat
          title="Total Revenue"
          stat={22}
          icon={<CircleDollarSign className="h-4 w-4" />}
        />
      </DashboardStatWrapper>
      <div className="w-full mb-6">
        <SearchInput
          searchInput={""}
          setSearchInput={() => {}}
          handleChange={() => {}}
          placeholder="Search by title, SKU or description..."
        />
      </div>
      <Table className="border">
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order No.</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>300100</TableCell>
            <TableCell className="text-center">petropoulosalex@gmail.com</TableCell>
            <TableCell className="text-center">Alex Petropoulos</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell className="text-center">$2999.99</TableCell>
            <TableCell>
              <Button onClick={() => {}} variant="ghost">
                <EditIcon className="w-4 h-4" />
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => {}}>
                <TrashIcon className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
export default AdminOrders;
