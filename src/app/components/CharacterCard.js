import React from "react";

const CharacterCard = ({ character, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        className="w-full rounded-md"
        src={character.image}
        alt={character.name}
      />
      <h3 className="font-bold text-xl mt-2">{character.name}</h3>
      <p className="text-gray-600">{character.species}</p>
      <button
        className="bg-red-500 text-white mt-2 rounded px-4 py-2"
        onClick={() => onDelete(character.id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CharacterCard;
