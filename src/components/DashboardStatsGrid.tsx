import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, CartesianGrid, Rectangle, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axiosInstance from '../helpers/axiosInstance';



function DashboardStatsGrid() {

  const [kpData, setKpData] = useState({
    type: [],
    purpose: [],
    language: [],
    targetAudience: []
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
        const targetAudienceCounts = countByAttribute(data, 'targetAudience');

        // Convert the resulting object to an array of objects with each attribute and their counts.
        setKpData({
          type: Object.keys(typeCounts).map(key => ({ key, count: typeCounts[key] })),
          purpose: Object.keys(purposeCounts).map(key => ({ key, count: purposeCounts[key] })),
          language: Object.keys(languageCounts).map(key => ({ key, count: languageCounts[key] })),
          targetAudience: Object.keys(targetAudienceCounts).map(key => ({ key, count: targetAudienceCounts[key] })),
          
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


  //Calculate the position where a label should be placed inside each pie slice in a pie chart.
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


  return (
    <div className='flex flex-col'>
      <div className='flex gap-4 w-full my-8'>
        <BoxWrapper>Kp count</BoxWrapper>
        <BoxWrapper>Program count</BoxWrapper>
        <BoxWrapper>Relationships reach</BoxWrapper>
        <BoxWrapper>Users</BoxWrapper>
      </div>

      <div className='flex'>

        <div >
          <BarChart width={400} height={300} data={kpData.type} margin={{ top: 20, right: 0, bottom: 0, left: 20 }}>
            <YAxis />
            <XAxis dataKey="key" />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" activeBar={<Rectangle fill="teal" />}>
              <LabelList dataKey="count" position="top" /> {/* Add count values to the bar */}
            </Bar>
          </BarChart>
        </div>

        <div>
          <PieChart width={400} height={300}>
            <Pie data={kpData.language}  fill="#8884d8"
              dataKey="count" nameKey="key" outerRadius={120} innerRadius={50} labelLine={false}  label={renderCustomizedLabel}>
              
              
              {kpData.language.map((entry, index) => (
                
                <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                
              ))}

            </Pie>

          </PieChart>

        </div>

      </div>
    </div>

  );
}

export default DashboardStatsGrid;

function BoxWrapper({ children }) {
  return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>;
}