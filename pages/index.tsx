import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "@/models/NewsArticle";
import axios from "axios";
import { NewsArticleEntry } from "@/components/NewsArticleEntry";
import { NewsArticlesGrid } from "@/components/NewsArticlesGrid";

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

const inter = Inter({ subsets: ["latin"] }); // load font from your server not the googles server

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  let newsUrl =
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=" +
    process.env.NEWS_API_KEY;
  console.log("NEWS" + newsUrl);
  const response = await axios.get(newsUrl); // this is server side fetch
  // console.log(response);
  const newsResponse: NewsResponse = await response.data; // this is getting data client side
  return {
    props: {
      newsArticles: newsResponse.articles,
    },
  };
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News - Nextjs News app</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
}
