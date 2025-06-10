"use client";

import { useState, useEffect } from "react";
import CharacterCard from "./components/CharacterCard";

// Definir el tipo de los personajes
interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

// Custom hook para obtener personajes de la API
const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar personajes desde la API
  const fetchCharacters = async () => {
    setLoading(true);
    setError(null); // Resetear error previo
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      if (!response.ok) throw new Error("API no disponible");
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      // Especificamos que el error es un objeto de tipo Error
      setError(
        `¡Error al cargar los personajes! ${(error as Error).message || ""}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un personaje de la lista
  const handleDelete = (id: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.id !== id)
    );
  };

  return { characters, loading, error, fetchCharacters, handleDelete };
};

const Home = () => {
  const { characters, loading, error, fetchCharacters, handleDelete } =
    useCharacters();

  // Efecto para cargar personajes al inicio
  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="p-6">
      <button
        className="bg-blue-500 text-white rounded px-4 py-2 mb-4 hover:bg-blue-600 transition-colors duration-300"
        onClick={fetchCharacters}
      >
        Recargar
      </button>

      {/* Mostrar error si ocurre */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar carga mientras se esperan los datos */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin rounded-full border-4 w-8 h-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <CharacterCard character={character} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
