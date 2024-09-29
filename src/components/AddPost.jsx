import { Stack, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";

export default function AddPost() {
  return (
    <Stack
      sx={{
        width: "60%",
        margin: "auto",
        marginTop: 1,
        // padding: 2,
        bgcolor: "white",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 1,
          textAlign: "center",
        }}
      >
        Ajouter une publication
      </Typography>
      <form>
        <Stack spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Parlez-nous de votre journée"
            variant="outlined"
            autoComplete="off"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            size="small"
            label="Veuillez saisir l'url de votre image"
            variant="outlined"
            autoComplete="off"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: 2,
            }}
          >
            Publier
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
