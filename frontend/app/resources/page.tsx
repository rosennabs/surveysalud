"use client";

const news = [
  {
    id: 1,
    title: "'I would need to meet your mother': Doctors refuse women's requests for sterilisation",
    author: "Jane Doe",
    country: "Thialand",
    time: "3 Hours Ago"
  },
  {
    id: 2,
    title: "Canada has a doctor shortage. So why can't foreign-trained physicians practice here?",
    author: "Adam Will",
    country: "Canada",
    time: "5 Hours Ago"
  },
  {
    id: 3,
    title: "Fourteen new cases of monkey-pox discovered in Congo",
    author: "Elliot Mike",
    country: "Congo",
    time: "4 Hours Ago"
  },
  {
    id: 4,
    title: "What the World Health Organization (WHO) has to say about child nutrition",
    author: "Amanda Smith",
    country: "Peru",
    time: "2 Hours Ago"
  },
]

const Resources = () => {
  return (
    <div className="mx-24 my-16">
      <h2 className="border-b-4 py-2 mb-12">Latest News</h2>

      <div className="grid grid-cols-4 gap-2">
        {news.map((item) => (
          <div key={item.id} className="border border-gray-300 ">
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
      
    </div>
  )
  
};

export default Resources;