import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList } from 'recharts';
import axiosInstance from '../helpers/axiosInstance';



function DashboardStatsGrid() {
  const [kpData, setKpData] = useState([]);

  useEffect(() => {
    const fetchKpData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8080/api/knowledge_product/all');
        const data = response.data;

        //Count Kp by type
        const countKpType = data.reduce((acc, element) => {
          if (acc[element.type]) { //if the kp type already exists in the accumulator, increment the count
            acc[element.type]++;
          } else {
            acc[element.type] = 1; //else count the kp type
          }
          return acc; //returns an object with each kp type and their count
        }, {});

        setKpData(countKpType);
      }
      catch (error) {
        console.error ('Error fetching KP data:', error);
      } 
  
    }


    fetchKpData(); 

  }, []);


  // Convert the result to an array of objects with each kp type and their count.
  const kpTypeData = Object.keys(kpData).map((kp_type) => ({
    kp_type, //shortcut for kpType = kp
    count: kpData[kp_type]
  }));


  return (
    <div className='flex flex-col'>
      <div className='flex gap-4 w-full my-8'>
        <BoxWrapper>Kp count</BoxWrapper>
        <BoxWrapper>Program count</BoxWrapper>
        <BoxWrapper>Relationships reach</BoxWrapper>
        <BoxWrapper>Users</BoxWrapper>
      </div>

      <div>
        <BarChart width={400} height={400} data={kpTypeData}>
          <XAxis dataKey="kp_type" />
          <Bar dataKey="count" fill="#8884d8">
            <LabelList dataKey="count" position="top"/> {/* Add count values to the bar */}
          </Bar>
        </BarChart>
      </div>
    </div>

  );
}

export default DashboardStatsGrid;

function BoxWrapper({ children }) {
  return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>;
}