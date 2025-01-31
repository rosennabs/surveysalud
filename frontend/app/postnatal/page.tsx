"use client"

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import axiosInstance from '@/helpers/axiosInstance';
import DashboardLayout from '@/components/DashboardLayout';

interface DataValues {
  age: string;
  receivedPostnatalCheckups: string;
  experiencedComplications: string;
  receivedBreastfeedingSupport: string;
  receivedMentalHealthSupport: string;
  providedNewbornCareInfo: string;
}

interface postnatalDataCounts {
  key: string;
  count: number;
}


// Count occurrences of specific values in the array of objects i.e data based on the given attribute/key
const countByAttribute = (data: DataValues[], attribute: string): postnatalDataCounts[] => {

  // <Record<string, number>> is a TypeScript type annotation specifying that the acc will be an object with keys of type string and values/count of type number
  const counts = data.reduce<Record<string, number>>((acc, item) => {
    const key = item[attribute];

    acc[key] = (acc[key] || 0) + 1; // checks if key exists in acc and increments count by 1
    return acc; // returns an object containing each key attribute and its count
  }, {});

  return Object.entries(counts).map(([key, count]) => ({ key, count })); //Converts the counts object into an array of key-value pairs. Each element in the resulting array is a tuple [key, count]. Destructure each tuple into variables.
};


function PostnatalDashboard() {
  const [postnatalData, setPostnatalData] = useState<Record<string, postnatalDataCounts[]>>({});
  const [monthlyEntries, setMonthlyEntries] = useState<{ date: string; total_entries: number; }[]>([]);

  // Determine the API URL based on the environment
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/postnatal_survey" // Development URL
      : process.env.NEXT_PUBLIC_BACKEND_URL + "/api/postnatal_survey"; // Production URL
  

  useEffect(() => {
    const fetchPostnatalData = async () => {
      try {
        const response = await axiosInstance.get<DataValues[]>(apiUrl);
        const data = response.data;

        const keysToCount = [
          "age",
          "received_postnatal_checkups",
          "experienced_complications",
          "received_breastfeeding_support",
          "received_mental_health_support",
          "provided_newborn_care_info",
        ];

        const processedData: Record<string, postnatalDataCounts[]> = keysToCount.reduce((acc, key) => {
          acc[key] = countByAttribute(data, key);
          return acc;
        }, {});

        setPostnatalData(processedData);
        //console.log("Logging processed data: ", processedData);

        // Fetch daily entries - date
        const monthlyResponse = await axiosInstance.get(apiUrl + '/monthly_entries');
        setMonthlyEntries(monthlyResponse.data);

      }
      catch (error) {
        console.error('Error fetching data from db:', error);
      }

    };


    fetchPostnatalData();

  }, []);



  const barCharts = ['age'];
  const pieCharts = ["received_postnatal_checkups", "experienced_complications", "received_breastfeeding_support",
    "received_mental_health_support", "provided_newborn_care_info"];

  return (
    <DashboardLayout>
    <div className="flex flex-col w-full mt-8 gap-8">
      {/* Row for Bar Charts */}
      <div className="flex flex-wrap gap-4">
        {barCharts.map((key) => (
          postnatalData[key] && (
            <div key={key} className="bg-white p-4 rounded shadow-lg flex-[1_1_48%]">
              <h5>{key.replace(/_/g, " ").toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={postnatalData[key]}>
                  <XAxis dataKey="key" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d">
                    <LabelList dataKey="count" position="insideTop" fill="#FFFFFF" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        ))}
      </div>

      {/* Row for Pie Charts */}
      <div className="flex flex-row gap-4">
        {pieCharts.map((key) => (
          postnatalData[key] && (
            <div key={key} className=" bg-white p-4 rounded shadow-lg flex-1">
              <h5>{key.replace(/_/g, " ").toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={postnatalData[key]}
                    dataKey="count"
                    nameKey="key"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={(entry) => entry.key}
                  >
                    {postnatalData[key].map((entry, index) => (
                      <Cell key={`cell-${entry.key}`} fill={entry.key === "Yes" ? '#00C49F' : '#FFBB28'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )
        ))}
      </div>

      {/* Line Chart for Daily Entries */}
      <div className=" bg-white p-4 rounded shadow-lg">
        <h5>TOTAL ENTRIES BY MONTH</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEntries}>
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
              <Line type="monotone" dataKey="total_entries" stroke="#FFBB28" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
    </DashboardLayout>
  );
}

export default PostnatalDashboard;

