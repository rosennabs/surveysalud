"use client";
import React, { useState } from "react";
import Button from "../../components/submitButton";


const news = [
  {
    id: 1,
    title: "'I would need to meet your mother': Doctors refuse women's requests for sterilisation",
    author: "Jane Doe",
    country: "Thialand",
    time: "3 Hours Ago",
    category: "health"
  },
  {
    id: 2,
    title: "Canada has a doctor shortage. So why can't foreign-trained physicians practice here?",
    author: "Adam Will",
    country: "Canada",
    time: "5 Hours Ago",
    category: "general"
  },
  {
    id: 3,
    title: "Fourteen new cases of monkey-pox discovered in Congo",
    author: "Elliot Mike",
    country: "Congo",
    time: "4 Hours Ago",
    category: "health"
  },
  {
    id: 4,
    title: "What the World Health Organization (WHO) has to say about child nutrition",
    author: "Amanda Smith",
    country: "Peru",
    time: "2 Hours Ago",
    category: "health"
  },
  {
    id: 1,
    title: "'I would need to meet your mother': Doctors refuse women's requests for sterilisation",
    author: "Jane Doe",
    country: "Thialand",
    time: "3 Hours Ago",
    category: "general"
  },
  {
    id: 2,
    title: "Canada has a doctor shortage. So why can't foreign-trained physicians practice here?",
    author: "Adam Will",
    country: "Canada",
    time: "5 Hours Ago",
    category: "health"
  },
  {
    id: 3,
    title: "Fourteen new cases of monkey-pox discovered in Congo",
    author: "Elliot Mike",
    country: "Congo",
    time: "4 Hours Ago",
    category: "health"
  },
  {
    id: 4,
    title: "What the World Health Organization (WHO) has to say about child nutrition",
    author: "Amanda Smith",
    country: "Peru",
    time: "2 Hours Ago",
    category: "health"
  },
]




const Resources = () => {

  const [showMoreNews, setShowMoreNews] = useState(false);
  const [section, setSection] = useState("");

  const handleLoadMore = (name: string) => {
    setSection(name)
    setShowMoreNews(true);
  };


  return (
    <div className="mx-24 my-16">

      {/* Latest News */}

      <h2 className="border-b-4 py-2 mb-12">Latest News</h2>

      <div className="grid grid-cols-4 gap-4">
        {news.slice(0,8).map((item) => (
          <div key={item.id} className="border border-gray-300 hover:outline hover:outline-yellow-500 hover:outline-2 cursor-pointer transition-all duration-300">
            <img
              src="/sthethoscope.jpg"
              alt="Image of a sthethoscope"
              className="h-[200px] w-full"
            />

            <div className="flex flex-col p-4">
              <h5 className="line-clamp-3">{item.title}</h5>
              <span>{item.author}</span>
              <span>{`${item.country} | ${item.time}`}</span>
            </div>

          </div>
        ))}
     
      </div>

      {!showMoreNews && (
      <div className="flex justify-center">
          <Button text={"Load More"} onClick={()=> handleLoadMore("more news")}/>   
        </div>
      )}


     
      {/* More Health News */}

      {showMoreNews && (
        <>
      <h2 className="border-b-4 py-2 my-20">More Health News</h2>
      <div className="grid grid-cols-4 gap-4">
        {news.slice(0,20).map((item) => (
          <div key={item.id} className="border border-gray-300 hover:outline hover:outline-yellow-500 hover:outline-2 cursor-pointer transition-all duration-300">
 
            <div className="flex p-4">
              <h5 className="line-clamp-3">{item.title}</h5>
              <img
                src="/sthethoscope.jpg"
                alt="Image of a sthethoscope"
                className="h-[100px] w-[100px]"
              />
            </div>
            <div className="flex flex-col p-4">
              <span>{item.author}</span>
              <span>{`${item.country} | ${item.time}`}</span>
            </div>
          </div>
        ))}

      </div>
      
          {section === "more news" && (
      <div className="flex justify-center">
            <Button text={"Load More"} onClick={() => handleLoadMore("table view")} />
            </div>
          )}
        </>
      )}
      

      
      {/* Table View News */}
      {showMoreNews && section === "table view" && (
        <div className="overflow-x-auto my-20">
          
          <h2 className="border-b-4 py-2 mb-12">General</h2>
        <table className="min-w-full text-left bg-yellow-50 rounded-3xl">
          {/* Table Header */}
          <thead className="border-b-4 border-gray-200 ">
            <tr>
              <th className="py-6 px-4">News</th>
              <th className="py-6 px-4">Date</th>
              <th className="py-6 px-4">Country</th>
              <th className="py-6 px-4">Author</th>
              <th className="py-6 px-4">Category</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {news.map((item, index) => (
              <tr key={index} className="border-b-8 border-white cursor-pointer hover:bg-yellow-400 transition">
                <td className="p-4">{item.title}</td>
                <td className="p-4">{item.time}</td>
                <td className="p-4">{item.country}</td>
                <td className="p-4">{item.author}</td>
                <td className="p-4">{item.category}</td>
              </tr>
            ))}
          </tbody>
          </table>
          
          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <div className="flex">

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  // Replace dynamic currentPage with a hardcoded value, e.g., 1
                  className={`px-4 py-2 border ${page === 1 ? "bg-yellow-500 text-white" : "bg-white text-black"
                    }`}

                >
                  {page}
                </button>
              ))}

              {/* Truncated button */}
              <span className="px-4 py-2 border bg-white text-black">...</span>

              {/* Last page button */}
              <button
                className="px-4 py-2 border bg-white text-black"
              >
                Last
              </button>
            </div>
          </div>
      </div>  

)}

    </div>
  )
  
};

export default Resources;