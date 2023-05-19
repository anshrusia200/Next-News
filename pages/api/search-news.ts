// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from "@/models/NewsArticle";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString();
  if (!searchQuery) {
    return res.status(400).json({ error: "Please provide a search query" });
  }
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsResponse: NewsResponse = await response.data;
  res.status(200).json(newsResponse.articles);
}
