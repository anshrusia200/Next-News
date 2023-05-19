import { NewsArticle } from "@/models/NewsArticle";
import Image from "next/image";
import { Card } from "react-bootstrap";
import placeholderImage from "@/assets/images/placeholder.jpg";
interface NewsArticleEntryProps {
  article: NewsArticle;
}
import styles from "@/styles/NewsArticleEntry.module.css";

export const NewsArticleEntry = ({
  article: { title, description, url, urlToImage },
}: NewsArticleEntryProps) => {
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;

  return (
    <a href={url} target="_blank">
      <Card className="h-100 ">
        <Image
          src={validImageUrl || placeholderImage}
          width={500}
          height={200}
          alt=""
          className={`card-img-top ${styles.image}`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text> {description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};
