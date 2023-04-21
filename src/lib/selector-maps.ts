import type { ComponentType, SvelteComponent } from "svelte";

import ArtistSelector from "./components/character-selectors/activities/ArtistSelector.svelte";
import BaseballSelector from "./components/character-selectors/activities/BaseballSelector.svelte";
import DoctorSelector from "./components/character-selectors/activities/DoctorSelector.svelte";
import FishermanSelector from "./components/character-selectors/activities/FishermanSelector.svelte";
import GardenerSelector from "./components/character-selectors/activities/GardenerSelector.svelte";
import GhostSelector from "./components/character-selectors/activities/GhostSelector.svelte";
import HockeySelector from "./components/character-selectors/activities/HockeySelector.svelte";
import NoneSelector from "./components/character-selectors/activities/NoneSelector.svelte";
import PhotographySelector from "./components/character-selectors/activities/PhotographySelector.svelte";

import ElephantSelector from "./components/character-selectors/animals/ElephantSelector.svelte";
import KangarooSelector from "./components/character-selectors/animals/KangarooSelector.svelte";
import MooseSelector from "./components/character-selectors/animals/MooseSelector.svelte";
import OtterSelector from "./components/character-selectors/animals/OtterSelector.svelte";
import PenguinSelector from "./components/character-selectors/animals/PenguinSelector.svelte";

import Elephant from "./components/characters/elephants/Elephant.svelte";
import ElephantArtist from "./components/characters/elephants/ElephantArtist.svelte";
import ElephantBaseball from "./components/characters/elephants/ElephantBaseball.svelte";
import ElephantDoctor from "./components/characters/elephants/ElephantDoctor.svelte";
import ElephantFisherman from "./components/characters/elephants/ElephantFisherman.svelte";
import ElephantGardener from "./components/characters/elephants/ElephantGardener.svelte";
import ElephantGhost from "./components/characters/elephants/ElephantGhost.svelte";
import ElephantHockey from "./components/characters/elephants/ElephantHockey.svelte";
import ElephantPhotographer from "./components/characters/elephants/ElephantPhotographer.svelte";

import Kangaroo from "./components/characters/kangaroos/Kangaroo.svelte";
import KangarooArtist from "./components/characters/kangaroos/KangarooArtist.svelte";
import KangarooBaseball from "./components/characters/kangaroos/KangarooBaseball.svelte";
import KangarooGhost from "./components/characters/kangaroos/KangarooGhost.svelte";
import KangarooHockey from "./components/characters/kangaroos/KangarooHockey.svelte";

import Moose from "./components/characters/moose/Moose.svelte";
import MooseArtist from "./components/characters/moose/MooseArtist.svelte";
import MooseDoctor from "./components/characters/moose/MooseDoctor.svelte";
import MooseGhost from "./components/characters/moose/MooseGhost.svelte";
import MooseHockey from "./components/characters/moose/MooseHockey.svelte";

import Otter from "./components/characters/otters/Otter.svelte";
import OtterDoctor from "./components/characters/otters/OtterDoctor.svelte";
import OtterGhost from "./components/characters/otters/OtterGhost.svelte";
import OtterHockey from "./components/characters/otters/OtterHockey.svelte";
import OtterPhotographer from "./components/characters/otters/OtterPhotographer.svelte";

import Penguin from "./components/characters/penguins/Penguin.svelte";
import PenguinBaseball from "./components/characters/penguins/PenguinBaseball.svelte";
import PenguinFisherman from "./components/characters/penguins/PenguinFisherman.svelte";
import PenguinGhost from "./components/characters/penguins/PenguinGhost.svelte";
import PenguinHockey from "./components/characters/penguins/PenguinHockey.svelte";

const characters: Record<string, ComponentType> = {
    "elephant": Elephant,
    "elephantArtist": ElephantArtist,
    "elephantBaseball": ElephantBaseball,
    "elephantDoctor": ElephantDoctor,
    "elephantFisherman": ElephantFisherman,
    "elephantGardener": ElephantGardener,
    "elephantGhost": ElephantGhost,
    "elephantHockey": ElephantHockey,
    "elephantPhotographer": ElephantPhotographer,

    "kangaroo": Kangaroo,
    "kangarooArtist": KangarooArtist,
    "kangarooBaseball": KangarooBaseball,
    "kangarooGhost": KangarooGhost,
    "kangarooHockey": KangarooHockey,

    "moose": Moose,
    "mooseArtist": MooseArtist,
    "mooseDoctor": MooseDoctor,
    "mooseGhost": MooseGhost,
    "mooseHockey": MooseHockey,

    "otter": Otter,
    "otterDoctor": OtterDoctor,
    "otterGhost": OtterGhost,
    "otterHockey": OtterHockey,
    "otterPhotographer": OtterPhotographer,

    "penguin": Penguin,
    "penguinBaseball": PenguinBaseball,
    "penguinFisherman": PenguinFisherman,
    "penguinGhost": PenguinGhost,
    "penguinHockey": PenguinHockey,
};

const characterSelectors = new Map<ComponentType, string>([
    [ElephantSelector, "elephant"],
    [KangarooSelector, "kangaroo"],
    [OtterSelector, "otter"],
    [MooseSelector, "moose"],
    [PenguinSelector, "penguin"],
]);

const activitySelectors = new Map<ComponentType, string>([
    [NoneSelector, ""],
    [ArtistSelector, "Artist"],
    [BaseballSelector, "Baseball"],
    [DoctorSelector, "Doctor"],
    [FishermanSelector, "Fisherman"],
    [GardenerSelector, "Gardener"],
    [GhostSelector, "Ghost"],
    [HockeySelector, "Hockey"],
    [PhotographySelector, "Photographer"],
]);

const elephantActivitySelectors: Array<ComponentType> = [NoneSelector, GhostSelector, HockeySelector, ArtistSelector, BaseballSelector, DoctorSelector, FishermanSelector, GardenerSelector, PhotographySelector];
const kangarooActivitySelectors: Array<ComponentType> = [NoneSelector, GhostSelector, HockeySelector, ArtistSelector, BaseballSelector];
const mooseActivitySelectors: Array<ComponentType> = [NoneSelector, GhostSelector, HockeySelector, ArtistSelector, DoctorSelector];
const otterActivitySelectors: Array<ComponentType> = [NoneSelector, GhostSelector, HockeySelector, DoctorSelector, PhotographySelector];
const penguinActivitySelectors: Array<ComponentType> = [NoneSelector, GhostSelector, HockeySelector, BaseballSelector, FishermanSelector];

const animalToActivities: Record<string, Array<ComponentType>> = {
    "elephant": elephantActivitySelectors,
    "kangaroo": kangarooActivitySelectors,
    "moose": mooseActivitySelectors,
    "otter": otterActivitySelectors,
    "penguin": penguinActivitySelectors,
};


export { characters, characterSelectors, activitySelectors, animalToActivities };