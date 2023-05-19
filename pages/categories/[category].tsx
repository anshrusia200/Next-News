import { NewsArticlesGrid } from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticle";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
interface CategoryNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    // slug is just what we call these relative URLs
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const paths = categorySlugs.map((slug) => ({ params: { category: slug } }));
  return {
    paths,
    fallback: false, // if we provide category other than the mentioned above then we will return 404 page
  };
};

export const getStaticProps: GetStaticProps<
  CategoryNewsPageProps // VALUE IN ANGLE BRACKETS IS RETURN VALUE'S TYPE
> = async ({ params }) => {
  // destructuring context object in the params of the function
  const category = params?.category?.toString();
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsResponse: NewsResponse = await response.data;
  return {
    props: {
      newsArticles: newsResponse.articles,
      revalidate: 5 * 60,
    },
  };
};

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
  const router = useRouter();
  const categoryName = router.query.category?.toString();
  const title = "Category: " + categoryName;

  return (
    <>
      <Head>
        <title key="title">{title} </title>
      </Head>
      <main>
        <h1>{`${title} - NextJS News App`}</h1>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
};

export default CategoryNewsPage;
