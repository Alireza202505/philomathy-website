import React from "react";
import CinematicScene from "@/components/home/CinematicScene";
import Scene1Curiosity from "@/components/home/scenes/Scene1Curiosity";
import Scene2Challenge from "@/components/home/scenes/Scene2Challenge";
import Scene3Discovery from "@/components/home/scenes/Scene3Discovery";
import Scene4Transformation from "@/components/home/scenes/Scene4Transformation";
import Scene5Founder from "@/components/home/scenes/Scene5Founder";
import Scene6SubjectsUniverse from "@/components/home/scenes/Scene6SubjectsUniverse";
import Scene7StudentStory from "@/components/home/scenes/Scene7StudentStory";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Scene8FinalCTA from "@/components/home/scenes/Scene8FinalCTA";

export default function Home() {
  return (
    <>
      <Scene1Curiosity />
      <CinematicScene><Scene2Challenge /></CinematicScene>
      <CinematicScene><Scene3Discovery /></CinematicScene>
      <CinematicScene><Scene4Transformation /></CinematicScene>
      <CinematicScene><Scene5Founder /></CinematicScene>
      <CinematicScene><Scene6SubjectsUniverse /></CinematicScene>
      <CinematicScene><Scene7StudentStory /></CinematicScene>
      <CinematicScene><TestimonialsSection /></CinematicScene>
      <CinematicScene><Scene8FinalCTA /></CinematicScene>
    </>
  );
}