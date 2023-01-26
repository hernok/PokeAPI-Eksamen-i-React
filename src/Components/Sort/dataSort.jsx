import { useState, useContext } from 'react';
import { PokemonContext } from '../Context/pokemonContext';

const DataSort = ({ value, toSort, className }) => {
	//Ved første klikk vil den sortere descending, jeg valgte det pga den er sortert etter ascending id fra API
	const [order, setOrder] = useState('DSC');
	const { pokemonList, setPokemonList } = useContext(PokemonContext);

	//Sorterer Pokemons alfabetisk eller etter id
	const sorting = (str) => {
		if (order === 'ASC') {
			const sorted = [...pokemonList].sort((a, b) =>
				a[str.toSort] > b[toSort] ? 1 : -1
			);
			setPokemonList(sorted);
			setOrder('DSC');
		}

		if (order === 'DSC') {
			const sorted = [...pokemonList].sort((a, b) =>
				a[str.toSort] < b[str.toSort] ? 1 : -1
			);
			setPokemonList(sorted);
			setOrder('ASC');
		}
	};
	//Sorterings knapp
	return (
		<>
			<button
				onClick={() => sorting({ toSort })}
				type='button'
				className={className}
				id='order-button'
			>
				{value}
			</button>
		</>
	);
};
export default DataSort;
