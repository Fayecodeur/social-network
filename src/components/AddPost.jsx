import { Stack, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddPost() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const validatePostDescription = (post) => {
    if (!post) {
      toast.error("Le titre du publication est obligatoire");
      return false;
    }
    return true;
  };

  const validatePostUrl = (url) => {
    if (!url) {
      toast.error("L'url de l'image est obligatoire");
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    // Récupérer l'utilisateur depuis le sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user")); // "utilisateur" est la clé correcte

    const { post, url } = data; // Extraction des données soumises

    // Vérifications de validation
    if (validatePostDescription(post) && validatePostUrl(url)) {
      // Créer l'objet publication
      const publication = {
        ...data,
        id_utilisateur: user.id, // Utiliser l'ID de l'utilisateur
        date_publication: new Date(),
        nombre_like: 0,
        auteur: `${user.prenom} ${user.nom}`, // Utiliser le prénom et le nom de l'utilisateur
      };

      try {
        // Envoyer la requête POST avec axios
        const response = await axios.post(
          "http://localhost:3000/publications",
          publication
        );
        toast.success("Publication ajoutée avec succès");
        reset();
      } catch (error) {
        toast.error("Erreur lors de l'ajout de la publication");
      }
    }
  };

  return (
    <Stack
      sx={{
        width: "50%",
        margin: "auto",
        marginTop: 1,
        padding: 2,
        bgcolor: "white",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 2,
          textAlign: "center",
          color: "#333",
        }}
      >
        Ajouter une publication
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Parlez-nous de votre journée"
            variant="outlined"
            autoComplete="off"
            multiline
            rows={3}
            {...register("post")}
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: "4px",
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="Veuillez saisir l'URL de votre image"
            variant="outlined"
            autoComplete="off"
            {...register("url")}
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: "4px",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: 2,
              bgcolor: "#1976d2", // Bouton bleu
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
          >
            Publier
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
