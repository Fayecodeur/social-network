import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Box } from "@mui/material";
import AddPostjsx from "../components/AddPost.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/connexion");
    }
  });
  return (
    <Box>
      <Navbar />
      <AddPostjsx />
    </Box>
  );
}
