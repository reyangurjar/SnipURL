"use client";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Copy from "@/assets/icons/Copy";
import UrlIcon from "@/assets/icons/Url";

const Hero = () => {
  const [url, setUrl] = useState("")
  const [createdUrl, setCreatedUrl] = useState([])

  const submitHandler = async () => {
    try {
      if(!url) {
        toast("Please enter a url")
        return;
      }
      const res = await fetch("/api/shortenUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      
      localStorage.setItem("createdUrls", JSON.stringify([...createdUrl, data.data]))
      setCreatedUrl([...createdUrl, data.data])
      toast("Shortened url",
      {  type: "success"}
      )
    } catch (error) {
      console.log(error);
      toast("Failed to shorten url",
      {  type: "error"}
      )
    }
   

  };

  useEffect(() => {
    let createdUrls = localStorage.getItem("createdUrls");
    if(createdUrls) {
      setCreatedUrl(JSON.parse(createdUrls))
    }

  }, [])

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast(' Copied to clipboard');
    console.log("text copied");
  };

  return (
    <div className="   justify-center items-center flex-col flex text-center px-4 sm:px-12 md:px-32 max-w-screen-lg mx-auto">
      <h1 className=" mt-12 sm:mt-18 md:mt-32 text-3xl sm:text-4xl  font-bold leading-[40px] mb-4 ">
        A Powerful URL Shortener
      </h1>
      <h2 className="px-4 mb-8 sm:px-12 md:px-16 sm:text-lg">
        Get going with your growth curve with these short and powerful tool to
        shorten your links.
      </h2>


      <label className=" rounded-full border border-gray-500 w-full py-2 px-2 sm:px-4 input-bordered flex items-center gap-2">
        <UrlIcon/>
        <input
          placeholder="Enter Your Long URL Here"
          className="w-full focus:outline-none"
          type="text"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && submitHandler()}
        />
      </label>

      <button
      className="hover:bg-primary bg-green-500  text-white rounded-full px-6 py-2 mt-4"
      onClick={submitHandler}
      >Shorten</button>


        {createdUrl.map((url) => (
          <div className="bg-green-200 rounded-md w-full mt-4 px-6 text-left py-4" key={url._id}>
          <div className="flex ">
          <div className="Links">
            <div className="flex gap-6 items-center">
            <a href={`/s/${url.shortUrl}`} tabIndex="_blank" className="hover:underline font-bold " >{`snip-url.vercel.app/s/${url.shortUrl}`}
            </a>
            <button onClick={() => copyText(`snip-url.vercel.app/s/${url.shortUrl}`)} className="hidden md:block">
              <Copy  height={18} width={18} color={"black"}/>
            </button>

            </div>
          </div>
        
          <div  className="ml-auto flex gap-2 items-center">
            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${url.fullUrl}`} className="qrcode w-8 ">
              <img src={"/qr-code.png"} alt="qr code image" />
            </a>
            <button
          className="font-semibold md:flex hidden   items-center justify-center   bg-primary hover:bg-green-700 text-white  px-6 py-2 rounded-lg"
          onClick={() => copyText(`snip-url.vercel.app/s/${url.shortUrl}`)}
          >
            <Copy height={24} width={24} color={"white"}/>
Copy Link
          </button>
          </div>
          </div>
          <p className="hidden sm:flex items-center gap-1 text-sm   truncate">
            <img src={`https://www.google.com/s2/favicons?domain=${url.fullUrl}`} alt="Urlicon" className="w-4 h-4" />
            {url.fullUrl}</p>
          <button
          className="font-semibold md:hidden mt-4 flex items-center justify-center bigCopyButtton w-full bg-primary hover:bg-green-700 text-white  px-6 py-2 rounded-lg"
          onClick={() => copyText(`snip-url.vercel.app/s/${url.shortUrl}`)}
          >
            <Copy height={24} width={24} color={"white"}/>
Copy Link
          </button>
        </div>
        ))}

        
    
    </div>
  );
};

export default Hero;
