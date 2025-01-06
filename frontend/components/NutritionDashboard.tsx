import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, Legend, Rectangle, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import axiosInstance from '../helpers/axiosInstance';


interface DataValues {
  id: number;
  age: string;
  // childWeight: number;
  exclusiveBreastfeeding: string;
  ageComplementaryFoods: number;
  mealFrequency: number;
  lastGrowthCheckup: string;
  growthChartAtHome: string;
}

interface NutritionDataCounts {
  key: string;
  count: number;
}


// Count occurrences of specific values in the array of objects i.e data based on the given attribute/key
const countByAttribute = (data: DataValues[], attribute: string): NutritionDataCounts[] => {

  // <Record<string, number>> is a TypeScript type annotation specifying that the acc will be an object with keys of type string and values/count of type number
  const counts = data.reduce<Record<string, number>>((acc, item) => {
    const key = item[attribute]; // e.g bcgVaccine

    acc[key] = (acc[key] || 0) + 1; // checks if key exists in acc and increments count by 1
    return acc; // returns an object containing each key attribute and its count
  }, {});

  return Object.entries(counts).map(([key, count]) => ({ key, count })); //Converts the counts object into an array of key-value pairs. Each element in the resulting array is a tuple [key, count]. Destructure each tuple into variables.
};


function NutritionDashboard() {
  const [nutritionData, setnutritionData] = useState<Record<string, NutritionDataCounts[]>>({});
  const [monthlyEntries, setMonthlyEntries] = useState<{ date: string; total_entries: number; }[]>([]);


  useEffect(() => {
    const fetchnutritionData = async () => {
      try {
        const response = await axiosInstance.get<DataValues[]>('http://localhost:8080/api/child_nutrition');
        const data = response.data;

        const keysToCount = [
          "id",
          "age",
          // "child_weight",
          "exclusive_breastfeeding",
          "age_complementary_foods",
          "meal_frequency",
          "last_growth_checkup",
          "growth_chart_at_home",
        ];

        const processedData: Record<string, NutritionDataCounts[]> = keysToCount.reduce((acc, key) => {
          acc[key] = countByAttribute(data, key);
          return acc;
        }, {});

        setnutritionData(processedData);
        //console.log("Logging processed data: ", processedData);

        // Fetch daily entries - date
        const monthlyResponse = await axiosInstance.get('http://localhost:8080/api/child_nutrition/monthly_entries');
        setMonthlyEntries(monthlyResponse.data);

      }
      catch (error) {
        console.error('Error fetching data from db:', error);
      }

    };


    fetchnutritionData();

  }, []);



  const barCharts = ['age', "age_complementary_foods", "meal_frequency", "last_growth_checkup",];
  const pieCharts = ['exclusive_breastfeeding', "growth_chart_at_home"];

  return (
    <div className="flex flex-col w-full mt-8 gap-8">
      {/* Row for Bar Charts */}
      <div className="flex flex-wrap gap-4">
        {barCharts.map((key) => (
          nutritionData[key] && (
            <div key={key} className="bg-white p-4 rounded shadow-lg flex-[1_1_48%]">
              <h5>{key.replace(/_/g, " ").toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nutritionData[key]}>
                  <XAxis dataKey="key" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8">
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
          nutritionData[key] && (
            <div key={key} className=" bg-white p-4 rounded shadow-lg flex-1">
              <h5>{key.replace(/_/g, " ").toUpperCase()}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={nutritionData[key]}
                    dataKey="count"
                    nameKey="key"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => entry.key}
                  >
                    {nutritionData[key].map((entry, index) => (
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
            <Line type="monotone" dataKey="total_entries" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default NutritionDashboard;

// DRY up code by creating a wrapping component with the repetitive stylings
function BoxWrapper({ children }) {
  return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>;
}