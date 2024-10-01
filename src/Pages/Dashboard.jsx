import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import AddPostjsx from "../components/AddPost.jsx";
import { Stack, Box, Typography, Avatar } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const url = "http://localhost:3000/publications";
  const navigate = useNavigate();

  // Vérification de la session utilisateur
  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/connexion");
    }
  }, [navigate]); // Ajout de `navigate` dans les dépendances

  const {
    data: publications = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["publications"],
    queryFn: () => axios.get(url).then((response) => response.data),
    onError: (error) => console.log(error),
  });

  // Affichage d'un message de chargement centré
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#e6dfff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ bgcolor: "#fff", padding: 2, borderRadius: 2, boxShadow: 1 }}
        >
          Chargement...
        </Typography>
      </Box>
    );
  }

  // Affichage d'un message d'erreur centré
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#e6dfff",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "red",
            bgcolor: "#fff",
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          Impossible de se connecter au serveur. Veuillez vérifier votre
          connexion internet ou réessayer plus tard.
        </Typography>
      </Box>
    );
  }

  // Trier les publications par date
  const sortedPublications = publications.sort(
    (a, b) => new Date(b.date_publication) - new Date(a.date_publication)
  );

  return (
    <Box sx={{ bgcolor: "#e6dfff", height: "auto" }}>
      <Navbar />
      <AddPostjsx />
      <Box
        sx={{
          width: "52%",
          margin: "auto",
          marginTop: 3,
          bgcolor: "fff56",
          paddingBottom: 2,
        }}
      >
        {publications.map((publication) => (
          <Box
            key={publication.id}
            sx={{
              padding: 2,
              borderBottom: "1px solid #ddd",
              marginBottom: 3, // Ajout d'un espace entre les publications
              bgcolor: "white",
              borderRadius: 5,
            }}
          >
            <Stack spacing={1}>
              <Avatar />
              <Typography sx={{ fontWeight: "bold" }}>
                {publication.auteur}
              </Typography>
              <Typography>{publication.post}</Typography>
              <Box
                component="img"
                src={publication.url}
                alt="post"
                sx={{ width: "100%", height: "auto", marginTop: 1 }}
              />
              <Typography sx={{ fontSize: "small", color: "gray" }}>
                {new Date(publication.date_publication).toLocaleString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // Pour afficher l'heure au format 24 heures
                  }
                )}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
