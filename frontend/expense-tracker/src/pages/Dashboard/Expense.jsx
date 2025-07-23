import React, { useEffect, useState } from "react";
import { useUserAuth } from "./../../hooks/useUserAuth";
import DashboardLayout from "./../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });


    // get all expense detaials
  const fetchExpenseDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

      if(response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong while fetching expense details", error);
    } finally {
      setLoading(false);
    }
  }


  // handle add expense
  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense;

    // validation checks
    if(!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Valid amount is required.");
      return;
    }

    if(!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Something went wrong while adding expense", error);
      toast.error("Failed to add expense. Please try again.");
    }
  }

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="">
          <div className="">
            <ExpenseOverview
              
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
