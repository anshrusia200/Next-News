import { NewsArticlesGrid } from "@/components/NewsArticlesGrid";
import { NewsArticle } from "@/models/NewsArticle";
import axios from "axios";
import { FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Head from "next/head";
const SearchNewsPage = () => {
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if (searchQuery) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await axios.get("/api/search-news?q=" + searchQuery);
        const articles: NewsArticle[] = await response.data;
        setSearchResults(articles);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title key="title">Search News - Nextjs news app</title>
      </Head>
      <main>
        <h1>Search News</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              name="searchQuery"
              placeholder="e.g. politics, sports, ..."
            />
          </Form.Group>
          <Button
            type="submit"
            className="mb-3"
            disabled={searchResultsLoading}
          >
            Search
          </Button>
        </Form>
        <div className="d-flex flex-column align-items-center">
          {searchResultsLoading && <Spinner animation="border" />}
          {searchResultsLoadingIsError && (
            <p>Something went wrong. Please try again.</p>
          )}
          {searchResults?.length === 0 && (
            <p>Nohing found. Try a different query</p>
          )}
          {searchResults && <NewsArticlesGrid articles={searchResults} />}
        </div>
      </main>
    </>
  );
};

export default SearchNewsPage;
