import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, Legend, Rectangle, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import axiosInstance from '../helpers/axiosInstance';


interface DataValues {
  id: number;
  age: string;
  bcgVaccine: string;
  opvVaccine: string;
  dptVaccine: string;
  measlesVaccine: string;
  reasonForMissingVaccinations: string;
}

interface VaccineDataCounts {
  key: string;
  count: number;
}


// Count occurrences of specific values in the array of objects i.e data based on the given attribute/key
const countByAttribute = (data: DataValues[], attribute: string): VaccineDataCounts[] => {

  // <Record<string, number>> is a TypeScript type annotation specifying that the acc will be an object with keys of type string and values/count of type number
  const counts = data.reduce<Record<string, number>>((acc, item) => {
    const key = item[attribute]; // e.g bcgVaccine

    // Skip counting if the key is empty or null
    if (!key || key.trim() === "") {
      return acc;
    }

    acc[key] = (acc[key] || 0) + 1; // checks if key exists in acc and increments count by 1
    return acc; // returns an object containing each key attribute and its count
  }, {});
 
  return Object.entries(counts).map(([key, count]) => ({ key, count })); //Converts the counts object into an array of key-value pairs. Each element in the resulting array is a tuple [key, count]. Destructure each tuple into variables.
}


function DashboardStatsGrid() {
  const [vaccineData, setVaccineData] = useState<Record<string, VaccineDataCounts[]>>({});
  const [monthlyEntries, setMonthlyEntries] = useState<{ date: string; total_entries: number; }[]>([]);


  useEffect(() => {
    const fetchVaccineData = async () => {
      try {
        const response = await axiosInstance.get<DataValues[]>('http://localhost:8080/api/child_vaccination');
        const data = response.data;

        const keysToCount = [
          "age",
          "bcg_vaccine",
          "opv_vaccine",
          "dpt_vaccine",
          "measles_vaccine",
          "reason_for_missing_vaccinations",
        ];
        
        const processedData: Record<string, VaccineDataCounts[]> = keysToCount.reduce((acc, key) => {
          acc[key] = countByAttribute(data, key);
          return acc;
        }, {});

        setVaccineData(processedData);
        //console.log("Logging processed data: ", processedData);

        // Fetch daily entries - date
        const monthlyResponse = await axiosInstance.get('http://localhost:8080/api/child_vaccination/monthly_entries');
        setMonthlyEntries(monthlyResponse.data);

      }
      catch (error) {
        console.error('Error fetching data from db:', error);
      }

    };


    fetchVaccineData();

  }, []);

  const chartMapping: Record<string, 'bar' | 'pie' | 'line'> = {
    age: 'bar',
    bcg_vaccine: 'pie',
    opv_vaccine: 'pie',
    dpt_vaccine: 'pie',
    measles_vaccine: 'pie',
    reason_for_missing_vaccinations: 'bar',
    // other_reasons: 'line',
    // reported_by: 'line',
  };

  const barCharts = ['age', 'reason_for_missing_vaccinations'];
  const pieCharts = ['bcg_vaccine', 'opv_vaccine', 'dpt_vaccine', 'measles_vaccine'];

  return (
    <div className="flex flex-col w-full mt-8 gap-8">
      {/* Row for Bar Charts */}
      <div className="flex flex-row gap-4">
        {barCharts.map((key) => (
          vaccineData[key] && (
            <div key={key} className="chart-container bg-white p-4 rounded shadow-lg flex-1">
              <h5>{key.replace(/_/g, " ").toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vaccineData[key]}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        ))}
      </div>

      {/* Row for Pie Charts */}
      <div className="flex flex-row gap-4">
        {pieCharts.map((key) => (
          vaccineData[key] && (
            <div key={key} className="chart-container bg-white p-4 rounded shadow-lg flex-1">
              <h5>{key.replace(/_/g, " ").toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vaccineData[key]}
                    dataKey="count"
                    nameKey="key"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => entry.key}
                  >
                    {vaccineData[key].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8884d8', '#83a6ed', '#8dd1e1'][index % 3]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )
        ))}
      </div>

      {/* Line Chart for Daily Entries */}
      <div className="chart-container bg-white p-4 rounded shadow-lg">
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
            <Legend />
            <Line type="monotone" dataKey="total_entries" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardStatsGrid;

// DRY up code by creating a wrapping component with the repetitive stylings
function BoxWrapper({ children }) {
  return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>;
}