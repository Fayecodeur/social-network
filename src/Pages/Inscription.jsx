import { Stack, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Inscription() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatePrenom = (prenom) => {
    if (!prenom) {
      toast.error("Le prénom est obligatoire");
      return false;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/i.test(prenom)) {
      toast.error("Le prénom ne peut contenir que des lettres");
      return false;
    }
    return true;
  };

  const validateNom = (nom) => {
    if (!nom) {
      toast.error("Le nom est obligatoire");
      return false;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/i.test(nom)) {
      toast.error("Le nom ne peut contenir que des lettres");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    if (!email) {
      toast.error("L'email est obligatoire");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)) {
      toast.error("L'adresse email n'est pas valide");
      return false;
    }
    return true;
  };

  const validatePasswords = (mdp, mdp_confirme) => {
    if (!mdp) {
      toast.error("Le mot de passe est obligatoire");
      return false;
    }
    if (!mdp_confirme) {
      toast.error("La confirmation du mot de passe est obligatoire");
      return false;
    }
    if (mdp !== mdp_confirme) {
      toast.error("Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    const url = "http://localhost:3000/utilisateurs";
    const { prenom, nom, email, mdp } = data;

    // Vérifications de validation
    if (
      validatePrenom(prenom) &&
      validateNom(nom) &&
      validateEmail(email) &&
      validatePasswords(mdp, data.mdp_confirme)
    ) {
      // Préparer les données à envoyer
      const userData = {
        prenom,
        nom,
        email,
        mdp,
      };

      try {
        // Vérifier si l'utilisateur existe déjà
        const response = await axios.get(`${url}?email=${data.email}`);
        if (response.data.length > 0) {
          toast.error("Un utilisateur avec cet email existe déjà");
        } else {
          // Envoyer les données de l'utilisateur
          await axios.post(url, userData);
          navigate("/connexion");
          toast.success("Inscription réussie");
        }
      } catch (error) {
        toast.error("Une erreur s'est produite");
      }
    }
  };

  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"lightgray"}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%", lg: "30%" }, // Largeur responsive
          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
          Inscription
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} gap={2}>
            <TextField
              fullWidth
              size="small"
              label="Prénom"
              variant="outlined"
              autoComplete="off" // Désactiver l'autocomplétion
              {...register("prenom")}
            />
            <TextField
              fullWidth
              size="small"
              label="Nom"
              variant="outlined"
              autoComplete="off" // Désactiver l'autocomplétion
              {...register("nom")}
            />
            <TextField
              fullWidth
              size="small"
              label="Adresse email"
              variant="outlined"
              autoComplete="off" // Désactiver l'autocomplétion
              {...register("email")}
            />
            <TextField
              fullWidth
              size="small"
              label="Mot de passe"
              variant="outlined"
              type="password"
              autoComplete="off" // Désactiver l'autocomplétion
              {...register("mdp")}
            />
            <TextField
              fullWidth
              size="small"
              label="Confirmation mot de passe"
              variant="outlined"
              type="password"
              autoComplete="off" // Désactiver l'autocomplétion
              {...register("mdp_confirme")}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: 1,
              }}
            >
              Inscription
            </Button>
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              Déja un compte?
              <Link to={"/connexion"}> Cliquez ici</Link>
            </Typography>
          </Stack>
        </form>
      </Box>
      <Toaster />
    </Stack>
  );
}
