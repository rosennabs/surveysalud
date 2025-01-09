"use client"

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import axiosInstance from '@/helpers/axiosInstance';
import DashboardLayout from '@/components/DashboardLayout';


interface DataValues {
  age: string;
  gestationalAge: number;
  numberOfCheckups: number;
  accessibilityCare: string;
  antenatalSupplements: string;
  vaccinationsReceived: string[];
  screeningTests: string[];
  healthEducationReceived: string;
  satisfactionCare: string;
}

interface AntenatalDataCounts {
  key: string;
  count: number;
}


// Count occurrences of specific values in the array of objects i.e data based on the given attribute/key
const countByAttribute = (data: DataValues[], attribute: string): AntenatalDataCounts[] => {

  // <Record<string, number>> is a TypeScript type annotation specifying that the acc will be an object with keys of type string and values/count of type number
  const counts = data.reduce<Record<string, number>>((acc, item) => {
    const values = Array.isArray(item[attribute]) ? item[attribute] : [item[attribute]];

    values.forEach((value) => {
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
    });

    return acc;
  }, {});

  return Object.entries(counts).map(([key, count]) => ({ key, count })); //Converts the counts object into an array of key-value pairs. Each element in the resulting array is a tuple [key, count]. Destructure each tuple into variables.
};


function AntenatalDashboard() {
  const [antenatalData, setAntenatalData] = useState<Record<string, AntenatalDataCounts[]>>({});
  const [monthlyEntries, setMonthlyEntries] = useState<{ date: string; total_entries: number; }[]>([]);


  useEffect(() => {
    const fetchAntenatalData = async () => {
      try {
        const response = await axiosInstance.get<DataValues[]>('http://localhost:8080/api/antenatal_survey');
        const data = response.data;

        const keysToCount = [
          "age",
          "gestational_age",
          "number_of_checkups",
          "accessibility_care",
          "antenatal_supplements",
          "vaccinations_received",
          "screening_tests",
          "health_education_received",
          "satisfaction_care",
        ];

        const processedData: Record<string, AntenatalDataCounts[]> = keysToCount.reduce((acc, key) => {
          acc[key] = countByAttribute(data, key);
          return acc;
        }, {});

        setAntenatalData(processedData);
        //console.log("Logging processed data: ", processedData);

        // Fetch daily entries - date
        const monthlyResponse = await axiosInstance.get('http://localhost:8080/api/antenatal_survey/monthly_entries');
        setMonthlyEntries(monthlyResponse.data);

      }
      catch (error) {
        console.error('Error fetching data from db:', error);
      }

    };


    fetchAntenatalData();

  }, []);



  const barCharts = ['age', "gestational_age", "number_of_checkups", "accessibility_care", "satisfaction_care"];
  const arrayCharts = ['vaccinations_received', 'screening_tests'];
  const pieCharts = ["antenatal_supplements", "health_education_received"];

  return (
    <DashboardLayout>
    <div className="flex flex-col w-full mt-8 gap-8">


      {/* Row for Array-Based Bar Charts */}
      <div className="flex flex-wrap gap-4">
        {arrayCharts.map((key) => (
          antenatalData[key] && (
            <div key={key} className="bg-white p-4 rounded shadow-lg flex-[1_1_48%]">
              <h5>{key.replace(/_/g, ' ').toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={antenatalData[key]}>
                  <XAxis dataKey="key" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        ))}
      </div>


      {/* Row for Pie Charts */}
      <div className="flex flex-row gap-4">
        {pieCharts.map((key) => (
          antenatalData[key] && (
            <div key={key} className=" bg-white p-4 rounded shadow-lg flex-1">
              <h5>{key.replace(/_/g, " ").toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={antenatalData[key]}
                    dataKey="count"
                    nameKey="key"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => entry.key}
                  >
                    {antenatalData[key].map((entry, index) => (
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

      {/* Row for Bar Charts */}
      <div className="flex flex-wrap gap-4">
        {barCharts.map((key) => (
          antenatalData[key] && (
            <div key={key} className="bg-white p-4 rounded shadow-lg flex-[1_1_48%]">
              <h5>{key.replace(/_/g, " ").toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={antenatalData[key]}>
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

export default AntenatalDashboard;

// DRY up code by creating a wrapping component with the repetitive stylings
function BoxWrapper({ children }) {
  return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>;
}