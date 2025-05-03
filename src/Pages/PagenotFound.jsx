import React from "react";
import notfound from "../Animation/404.json";
import {useNavigate} from "react-router";
import {Player} from "@lottiefiles/react-lottie-player";

export default function PagenotFound() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")}>
      <Player autoplay loop src={notfound} onClick={() => navigate("/")} className="w-full h-screen mb-6" />
    </div>
  );
}
