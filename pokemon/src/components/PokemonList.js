import React, { useState, useEffect } from 'react'
import axios from 'axios';

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);  

  useEffect(() => {
    const fetchData = async () => {
      const allPokemonListData = [];
      for (let i = 1; i <= 151; i++) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
        const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko');
        allPokemonListData.push({ ...response.data, korean_name: koreanName.name });
      }
      setPokemonData(allPokemonListData);
    };
  
    fetchData();
  }, []);

  const renderPokemonList = () => {
    return pokemonData.map((pokemon) => (
      <div key={pokemon.id}>
        <img src={pokemon.sprites.front_default} alt={pokemon.korean_name} />
        <p>{pokemon.korean_name}</p>
        <p>도감번호: {pokemon.id}</p>
        <p>영문명: {pokemon.name}</p>
      </div>
    ));
  };

  return (
    <div>
        {renderPokemonList()}
    </div>
  )
}

export default PokemonList