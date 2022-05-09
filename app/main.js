import "modern-css-reset";
import "./../assets/styles/tailwind.css";
import "./../assets/styles/style.css";
import "phosphor-icons";
import { initPokemonController } from "./pokemonController.js";


window.addEventListener("load", () => {
    initPokemonController()
})
