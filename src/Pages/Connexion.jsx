import { Stack, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Inscription() {
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      navigate("/dashboard");
    }
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const validatePassword = (mdp) => {
    if (!mdp) {
      toast.error("Le mot de passe est obligatoire");
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    // Récupérer l'email et le mot de passe soumis
    const { email, mdp } = data;
    const url = "http://localhost:3000/utilisateurs";

    // Vérifications de validation
    if (validateEmail(email) && validatePassword(mdp)) {
      try {
        const response = await fetch(`${url}?email=${email}`);

        // Convertir la réponse en JSON
        const utilisateurs = await response.json();

        // Vérifier s'il existe un utilisateur avec cet email
        if (utilisateurs.length > 0) {
          const utilisateur = utilisateurs[0]; // Le premier utilisateur trouvé
          // Vérifier si le mot de passe est correct
          if (utilisateur.mdp === mdp) {
            toast.success("Connexion réussie");
            // Extraire uniquement le prenom, nom, et id
            const { prenom, nom, id } = utilisateur;
            sessionStorage.setItem("user", JSON.stringify({ prenom, nom, id }));
            navigate("/dashboard"); // Redirection après connexion réussie
          } else {
            toast.error("Identifiants incorrects");
          }
        } else {
          toast.error(
            "Identifiants incorrects. Assurez-vous d'avoir un compte avant de vous connecté"
          );
        }
      } catch (error) {
        toast.error("Erreur lors de la connexion");
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
          Connexion
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} gap={3}>
            <TextField
              fullWidth
              size="small"
              label="Adresse email"
              variant="outlined"
              {...register("email")}
            />
            <TextField
              fullWidth
              size="small"
              label="Mot de passe"
              variant="outlined"
              type="password"
              {...register("mdp")}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: 1,
              }}
            >
              Connexion
            </Button>

            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              Voulez-vous créer un compte?
              <Link to={"/inscription"}> Cliquez ici</Link>
            </Typography>
          </Stack>
        </form>
      </Box>
      <Toaster />
    </Stack>
  );
}
