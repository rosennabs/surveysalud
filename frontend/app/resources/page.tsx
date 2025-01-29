"use client";
import React, { useState } from "react";
import Button from "../../components/submitButton";
import { newsData } from "@/helpers/newsData";
import { format } from "date-fns";
import Link from "next/link";




const Resources = () => {

  const [showMoreNews, setShowMoreNews] = useState(false);
  const [section, setSection] = useState("");

  const handleLoadMore = (name: string) => {
    setSection(name)
    setShowMoreNews(true);
  };

  const formatPublishedDate = (date: string) => {
    return format(new Date(date), "MMM d, yyyy");
  };

  return (
    <div className="mx-24 my-16">

      {/* Latest News */}

      <h2 className="border-b-4 py-2 mb-12">Latest News</h2>

      <div className="grid grid-cols-4 gap-4">
        {newsData.slice(0, 8).map((item, index) => (
          <Link key={index} href={item.url} target="_blank" rel="noopener noreferrer">
          <div className="border border-gray-300 hover:outline hover:outline-yellow-500 hover:outline-2 cursor-pointer transition-all duration-300">
            <img
              src={item.image ? item.image : "/sthethoscope.jpg"}
              alt="Image of a sthethoscope"
              className="h-[200px] w-full object-cover"
            />

            <div className="flex flex-col p-4">
              <h5 className="line-clamp-2">{item.title}</h5>
              <span>{item.source}</span>
              <span>{`${item.country} | ${formatPublishedDate(item.published_at)}`}</span>
            </div>

            </div>
          </Link>
        ))}
     
      </div>

      {!showMoreNews && (
      <div className="flex justify-center">
          <Button
            text={"Load More"}
            onClick={() => handleLoadMore("more news")}
            isSubmitting={false}
            status={null}
          />   
        </div>
      )}


     
      {/* More Health News */}

      {showMoreNews && (
        <>
          <h2 className="border-b-4 py-2 my-20">More Health News</h2>
          
      <div className="grid grid-cols-4 gap-4">
            {newsData.slice(8, 20).map((item) => (
              <Link key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
          <div  className="border border-gray-300 hover:outline hover:outline-yellow-500 hover:outline-2 cursor-pointer transition-all duration-300">
 
            <div className="flex p-4">
              <h5 className="line-clamp-3">{item.title}</h5>
              <img
                src={item.image ? item.image : "/vaccine.jpg"}
                alt="Image of a syringe"
                className="h-[100px] w-[100px] object-cover"
              />
            </div>
            <div className="flex flex-col p-4">
              <span>{item.source}</span>
              <span>{`${item.country} | ${formatPublishedDate(item.published_at)}`}</span>
            </div>
                </div>
              </Link>
        ))}

            </div>
          
      
          {section === "more news" && (
      <div className="flex justify-center">
              <Button
                text={"Load More"}
                onClick={() => handleLoadMore("table view")}
                isSubmitting={false}
                status={null}
              />
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
              <th className="py-6 px-4">Source</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
              {newsData.map((item, index) => (
                
                <tr key={index} className="border-b-8 border-white cursor-pointer hover:bg-yellow-400 transition">
                  <td className="p-4">
                    <Link href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {item.title}
                    </Link>
                  </td>
                  <td className="p-4 w-[150px]">{formatPublishedDate(item.published_at)}</td>
                <td className="p-4 w-[150px]">{item.country}</td>
                  <td className="p-4">{item.source}</td>
            
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