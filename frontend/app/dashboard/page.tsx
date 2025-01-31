"use client"

import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import axiosInstance from '@/helpers/axiosInstance';

const DashboardHome = () => {

  // Determine the API URL based on the environment
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/total_entries" // Development URL
      : process.env.NEXT_PUBLIC_BACKEND_URL + "/api/total_entries"; // Production URL
  

  useEffect(() => {
    const fetchTotalEntries = async () => {
      try {

        // Fetch daily entries - date
        const response = await axiosInstance.get(apiUrl);
        
        setTotalEntries(response.data);

      }
      catch (error) {
        console.error('Error fetching data from db:', error);
      }

    }
    fetchTotalEntries();
  }, [])

  const [totalEntries, setTotalEntries] = useState<{ date: string; total_entries: number; }[]>([]);


  return (
    <DashboardLayout>
      <div>
        {/* Line Chart for Daily Entries */}
        <div className=" bg-white p-4 rounded shadow-lg">
          <h5>TOTAL ENTRIES BY MONTH</h5>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={totalEntries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickFormatter={(month) => {
                const [year, monthNumber] = month.split('-');
                return `${new Date(year, monthNumber - 1).toLocaleString('default', { month: 'short' })} ${year}`;
              }} />
              <YAxis />
              <Tooltip labelFormatter={(month) => {
                const [year, monthNumber] = month.split('-');
                return `${new Date(year, monthNumber - 1).toLocaleString('default', { month: 'short' })} ${year}`;
              }} />
              <Line type="monotone" dataKey="total_entries" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart for Monthly Entries */}
      <div className="bg-white p-4 rounded shadow-lg">
       
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={totalEntries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={(month) => {
                const [year, monthNumber] = month.split('-');
                return `${new Date(year, monthNumber - 1).toLocaleString('default', { month: 'short' })} ${year}`;
              }}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(month) => {
                const [year, monthNumber] = month.split('-');
                return `${new Date(year, monthNumber - 1).toLocaleString('default', { month: 'short' })} ${year}`;
              }}
            />
            <Bar dataKey="total_entries" fill="#82ca9d">
              <LabelList dataKey="total_entries" position="insideTop" fill="#FFFFFF" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </DashboardLayout>
  );
};

export default DashboardHome;