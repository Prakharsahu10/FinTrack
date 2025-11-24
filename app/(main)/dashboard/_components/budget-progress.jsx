"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, transactions }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  // Get available months from transaction history
  const availableMonths = [
    ...new Set(
      transactions.map((t) => {
        const date = new Date(t.date);
        return `${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}`;
      })
    ),
  ].sort((a, b) => b.localeCompare(a)); // Sort descending (newest first)

  // Get the most recent month with transactions
  const latestTransaction =
    transactions.length > 0
      ? new Date(Math.max(...transactions.map((t) => new Date(t.date))))
      : new Date();

  const defaultMonth =
    availableMonths.length > 0
      ? availableMonths[0]
      : `${latestTransaction.getFullYear()}-${String(latestTransaction.getMonth()).padStart(2, "0")}`;

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  // Parse selected month
  const [selectedYear, selectedMonthNum] = selectedMonth.split("-").map(Number);

  // Calculate expenses for selected month
  const currentExpenses = transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        t.type === "EXPENSE" &&
        transactionDate.getMonth() === selectedMonthNum &&
        transactionDate.getFullYear() === selectedYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium text-gray-100">
            Monthly Budget
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32 text-white placeholder:text-gray-400"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription className="text-gray-400">
                  {initialBudget
                    ? `$${currentExpenses.toFixed(
                        2
                      )} of $${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6"
                >
                  <Pencil className="h-3 w-3 text-white" />
                </Button>
              </>
            )}
          </div>
        </div>
        {availableMonths.length > 0 && (
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[150px] text-white">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {availableMonths.map((month) => {
                const [year, monthNum] = month.split("-").map(Number);
                const date = new Date(year, monthNum);
                return (
                  <SelectItem
                    key={month}
                    value={month}
                    className="text-white focus:bg-gray-800 focus:text-white"
                  >
                    {format(date, "MMMM yyyy")}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className="space-y-2">
            <Progress
              value={percentUsed}
              className="bg-gray-700"
              extraStyles={`${
                // add to Progress component
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                    ? "bg-yellow-500"
                    : "bg-teal-500"
              }`}
            />
            <p className="text-xs text-gray-400 text-right">
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
