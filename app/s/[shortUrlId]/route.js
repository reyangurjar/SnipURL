 import { NextRequest, NextResponse } from "next/server";
 import { redirect } from 'next/navigation'
 import { permanentRedirect } from 'next/navigation'
 import Url from "@/models/shortUrl";
 import connectMongoDB from "@/libs/utils/connectdb";
 
export  async function GET(req, { params }){
    try {
        await connectMongoDB();

        const shortUrlId = params.shortUrlId;
       
       
        const url = await Url.findOne({ shortUrl: shortUrlId });
        // if url.fullUrl doesn't contain https at the start then, add it and then redirect it
        console.log(url)
        if (!url.fullUrl.startsWith('https://')) {
            return NextResponse.redirect(`https://${url.fullUrl}`);
        }
        else{
            return NextResponse.redirect(url.fullUrl);
        }
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ message: 'Error: Failed to connect to mongodb or request problem.', error: error });
    }


}