import React, { useEffect, useState } from 'react'
import DashboardLayout from './../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from './../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {

  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });


  // get all income detaials
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

      if(response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong while fetching income details", error);
    } finally {
      setLoading(false);
    }
  }


  // handle add income
  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;

    // validation checks
    if(!source.trim()) {
      toast.error("Source is required.");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Something went wrong while adding income", error);
      toast.error("Failed to add income. Please try again.");
    }
  }

  // handle delete income
  const handleDeleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Something went wrong while deleting income", error);
      toast.error("Failed to delete income. Please try again.");
    }
  }

  // handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      })

      // create a url for blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.success("Income details downloaded successfully.");
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Something went wrong while downloading income details", error);
      toast.error("Failed to download income details. Please try again.");
    }
  }


  useEffect(() => {
    fetchIncomeDetails();
  }, [])


  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className=''>
          <IncomeOverview
            transactions={incomeData}
            onAddIncome = {() => setOpenAddIncomeModal(true)} 
          />
        </div>

        <IncomeList 
          transactions={incomeData}
          onDelete={(id) => {
            setOpenDeleteAlert({show: true, data: id})
          }}
          onDownload={handleDownloadIncomeDetails}
        />
      </div>

      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show: false, data: null})}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want to delete this income?"
          onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default Income;