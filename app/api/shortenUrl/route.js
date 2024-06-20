import { NextResponse } from 'next/server';
import dbConnect from '@/libs/utils/connectdb';
import Url from '@/models/shortUrl';
import { nanoid } from 'nanoid'

export async function POST(request) {
    try {
      await dbConnect();

      const { url } = await request.json();
        console.log(url)
      // Create a new Url document
      const newShortUrl = new Url({
        fullUrl: url,
        shortUrl: nanoid(5)
      })
      await newShortUrl.save();
      console.log(newShortUrl)
      return NextResponse.json({ message: 'Short Url created successfully',data: newShortUrl, status: 201 });
    } catch (error) {
      console.log("Error: ", error);
      return NextResponse.json({ message: 'Error: Failed to create a new password.', error: error });
    }
  }


