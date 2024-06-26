import * as React from "react";
import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./RecommendationsPage.scss";

export default function RecommendationsPage({
  recommendedAnimeResponse,
  recommendedAnimeData,
  onChange,
}) {
  const [renderRecommendedAnime, setRenderRecommendedAnime] = useState(null);

  const MALapiURL = `https://api.jikan.moe/v4/anime/${recommendedAnimeData
    .trim()
    .replace(")", "")}`;

  const handleRecommendedAnime = async () => {
    if (!recommendedAnimeData) {
      return;
    }
    try {
      const { data } = await axios.get(MALapiURL);
      setRenderRecommendedAnime(data.data);

      return;
    } catch (error) {
      console.error("Error rendering anime:", error);
    }
  };

  useEffect(() => {
    handleRecommendedAnime();
  }, [onChange]);

  return (
    <>
      <section class="section__recommendations section--fade-in section--rays">
        <div className="section__recommendations--card">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: "30rem" }}
              image={
                renderRecommendedAnime &&
                renderRecommendedAnime.images.jpg.image_url
              }
              title=""
            />
            <CardContent
              sx={{
                paddingBottom: "0px",
                padding: "0px",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontFamily: "Dimitri Inverse" }}
              >
                {" "}
                {recommendedAnimeResponse}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {renderRecommendedAnime && renderRecommendedAnime.synopsis}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </>
  );
}
