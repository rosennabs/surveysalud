import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, Legend, Rectangle, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import axiosInstance from '../helpers/axiosInstance';

// Sample data with dates
const data = [
  { date: '2024-01-15', value: 30 },
  { date: '2024-04-15', value: 45 },
  { date: '2024-07-15', value: 65 },
  { date: '2024-10-15', value: 85 },
  { date: '2025-01-15', value: 95 },
];

function DashboardStatsGrid() {

  const [kpData, setKpData] = useState({
    type: [],
    purpose: [],
    language: [],
    audience: []
  });

  useEffect(() => {
    const fetchKpData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8080/api/knowledge_product/all');
        const data = response.data;

        //Function to count Kp by any attribute
        const countByAttribute = (data, attribute) => {
          return data.reduce((acc, element) => {
            const key = element[attribute];
            if (acc[key]) { //if the key already exists in the accumulator, increment the count value
              acc[key]++;
            } else {
              acc[key] = 1; //else create and count the key
            }
            return acc; //returns an object with each kp type and their count
          }, {});
        };

        //Use the function for different attributes
        const typeCounts = countByAttribute(data, 'type');
        const purposeCounts = countByAttribute(data, 'purpose');
        const languageCounts = countByAttribute(data, 'language');
        const audienceCounts = countByAttribute(data, 'audience');

        // Convert the resulting object to an array of objects with each attribute and their counts.
        setKpData({
          type: Object.keys(typeCounts).map(key => ({ key, count: typeCounts[key] })),
          purpose: Object.keys(purposeCounts).map(key => ({ key, count: purposeCounts[key] })),
          language: Object.keys(languageCounts).map(key => ({ key, count: languageCounts[key] })),
          audience: Object.keys(audienceCounts).map(key => ({ key, count: audienceCounts[key] })),
          
        })
        
          
      }
      catch (error) {
        console.error('Error fetching KP data:', error);
      }

    };


    fetchKpData();

  }, []);

  // Colors for pie slices
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];


  //Calculate the position where a % label should be placed inside each pie slice in a pie chart. gotten from rechart docs
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );

  }

  const getQuarter = (dateStr) => {
    const date = new Date(dateStr); // Converts the date string into a javascript date object
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript, add 1 to get the right month value
    const year = date.getFullYear();

    if (month >= 1 && month <= 3) return `Q1 ${year}`;
    if (month >= 4 && month <= 6) return `Q2 ${year}`;
    if (month >= 7 && month <= 9) return `Q3 ${year}`;
    if (month >= 10 && month <= 12) return `Q4 ${year}`;
  };


  return (
    <div className='flex flex-col'>
      <div className='flex gap-4 w-full my-8'>
        <BoxWrapper>Kp count</BoxWrapper>
        <BoxWrapper>Program count</BoxWrapper>
        <BoxWrapper>Relationships reach</BoxWrapper>
        <BoxWrapper>Users</BoxWrapper>
      </div>

      <div className='flex justify-between'>

        <div className='flex-1'>
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={kpData.type} margin={{ top: 20, right: 0, bottom: 0, left: 20 }}>
            <YAxis />
            <XAxis dataKey="key" />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" activeBar={<Rectangle fill="teal" />}>
              <LabelList dataKey="count" position="top" /> {/* Add count values to the bar */}
            </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='flex-1 my-8'>
          <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={kpData.language}  fill="#8884d8"
              dataKey="count" nameKey="key" outerRadius={120} innerRadius={50} labelLine={false}   label={renderCustomizedLabel}>
   
              {kpData.language.map((entry, index) => (
                
                <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                
              ))}

            </Pie>
            <Legend layout='vertical' align='right' verticalAlign='middle'/>

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={getQuarter} // Format the dates as quarters
            />
            <YAxis />
            <Tooltip labelFormatter={getQuarter} /> {/* Show quarters in the tooltip as well */}
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
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