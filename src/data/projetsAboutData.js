import mardawaBrew from "../assets/img-projects-data/mardawaBrew.png";
import dashboardMardawa from "../assets/img-projects-data/dashboardMardawa.png";
import lezattoPasto from "../assets/img-projects-data/lezattoPasto.png";
import movieFinder from "../assets/img-projects-data/movieFinder.png";

export const projects = [
  {
    title: "Mardawa Brew ",
    description:
      "Website landing page and mini e-commerce for Mardawa Brew company",
    image: mardawaBrew.src,
    technologies: ["TypeScript", "React", "Astro"],
    demo: "https://brew.mardawa.id/",
    code: "private",
  },
  {
    title: "Dashboard Mardawa",
    description: "Internal dashboard for PT. Mardawa Intiguna Persada",
    image: dashboardMardawa.src,
    technologies: ["TypeScript", "React", "JavaScript"],
    demo: "https://dasbor.mardawa.id/",
    code: "private",
  },
  {
    title: "Lezatto Pasto",
    description: "Landing page website for Lezatto Pasto restaurant",
    image: lezattoPasto.src,
    technologies: ["JavaScript", "React", "Node.js"],
    demo: "https://lezattopasto-id.vercel.app/",
    code: "https://github.com/Nathxmd/Trans-food",
  },
  {
    title: "MovieFinder",
    description: "Movie finder with OMDB API integration",
    image: movieFinder.src,
    technologies: ["JavaScript", "React", "API"],
    demo: "https://movie-finder-khaki.vercel.app/",
    code: "https://github.com/Nathxmd/MovieFinder",
  },
];
