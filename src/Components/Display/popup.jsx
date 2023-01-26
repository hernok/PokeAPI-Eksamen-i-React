import axios from 'axios';
import React, { useEffect, useState } from 'react';

//For å få evolution data for Pokemon må man gå dypt, spør du meg er det en tungvint måte å sette opp et API på.
//Er kanskje sånn for at man skal måtte bruke mye fetch

const Popup = ({ open, close, pokemonData }) => {
	const [evoChainUrl, setEvoChainUrl] = useState('');
	const [speciesUrl, setSpeciesUrl] = useState('');
	const [evoChainData, setEvoChainData] = useState([]);
	const [firstEvo, setFirstEvo] = useState([]);
	const [secondEvo, setSecondEvo] = useState([]);
	const [thirdEvo, setThirdEvo] = useState([]);
	const [loading, setLoading] = useState('');
	const [error, setError] = useState('');

	//Species url fra trykket Pokemon
	useEffect(() => {
		setSpeciesUrl(pokemonData.species?.url);
	}, [pokemonData]);

	//Species url -> evolution chain url
	useEffect(() => {
		setLoading(true);
		axios
			.get(speciesUrl)
			.then((res) => {
				setEvoChainUrl(res.data.evolution_chain?.url);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [speciesUrl]);

	//Evolution chain url -> Pokemon navn
	useEffect(() => {
		setLoading(true);
		axios
			.get(evoChainUrl)
			.then((res) => {
				setEvoChainData(res.data);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [evoChainUrl]);

	//Pokemon navn -> data for første evolution
	useEffect(() => {
		setFirstEvo(null);
		if (evoChainData.chain?.evolves_to[0]?.species.url) {
			setLoading(true);
			axios
				.get(
					`https://pokeapi.co/api/v2/pokemon/${evoChainData.chain?.species.name}`
				)
				.then((res) => {
					setFirstEvo(res.data);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [evoChainData]);

	//Pokemon navn -> data for andre evolution
	useEffect(() => {
		setSecondEvo(null);
		if (evoChainData.chain?.evolves_to[0]?.species.url) {
			setLoading(true);
			axios
				.get(
					`https://pokeapi.co/api/v2/pokemon/${evoChainData.chain?.evolves_to[0]?.species.name}`
				)
				.then((res) => {
					setSecondEvo(res.data);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [evoChainData]);

	//Pokemon navn -> data for tredje evolution
	useEffect(() => {
		setThirdEvo(null);
		if (evoChainData.chain?.evolves_to[0]?.evolves_to[0]?.species.url) {
			setLoading(true);
			axios
				.get(
					`https://pokeapi.co/api/v2/pokemon/${evoChainData.chain?.evolves_to[0]?.evolves_to[0]?.species.name}`
				)
				.then((res) => {
					setThirdEvo(res.data);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [evoChainData]);

	if (!open) return null;
	return (
		<div className='god-wrapper'>
			<div className='popup-wrapper'>
				<div className='popup-pokemon-box'>
					<div className='popup-info-box'>
						<div className='popup-top-row'>
							{pokemonData && (
								<p className='popup-name'>
									{/*Endrer første bokstav i navn til uppercase */}
									{pokemonData.name
										? pokemonData.name.charAt(0).toUpperCase() +
										  pokemonData.name.slice(1)
										: null}
								</p>
							)}
							{/*Knapp for å lukke popup, endrer setOpen til false*/}
							<button className='close-button' onClick={close}>
								X
							</button>
						</div>
						<div className='popup-image-box'>
							{/*Hoved bilde i popup*/}
							<img
								className='popup-image'
								src={pokemonData.sprites.front_default}
								alt={`a picture of the pokemon, ${pokemonData.name}`}
							/>
						</div>
						<p className='popup-id'>ID #{pokemonData.id}</p>
						<div className='popup-type-div'>
							{/*Endrer første bokstav i type til uppercase*/}
							<p
								className={'popup-type-' + pokemonData.types[0].type.name}
								id='popup-type'
							>
								{pokemonData.types[0]
									? pokemonData.types[0].type.name.charAt(0).toUpperCase() +
									  pokemonData.types[0]?.type.name.slice(1)
									: null}
							</p>
							<p
								className={'popup-type-' + pokemonData.types[1]?.type.name}
								id='popup-type'
							>
								{pokemonData.types[1]
									? pokemonData.types[1]?.type.name.charAt(0).toUpperCase() +
									  pokemonData.types[1]?.type.name.slice(1)
									: null}
							</p>
						</div>
					</div>
				</div>
				{/*Evolutions*/}
				<div className='popup-evolution-box'>
					<div className='popup-evolution-1'>
						First Evolution
						{firstEvo !== 'undefined' && (
							<p className='popup-evo-name'>
								{firstEvo
									? firstEvo.name.charAt(0).toUpperCase() +
									  firstEvo.name.slice(1)
									: 'Does not evolve into first form'}
							</p>
						)}
						{firstEvo && (
							<img
								className='evo-img'
								src={firstEvo.sprites?.front_default}
								alt={`a picture of the pokemon, ${firstEvo.name}`}
							/>
						)}
					</div>
					<div className='popup-evolution-2'>
						Second Evolution
						{secondEvo !== 'undefined' && (
							<p className='popup-evo-name'>
								{secondEvo
									? secondEvo.name.charAt(0).toUpperCase() +
									  secondEvo.name.slice(1)
									: 'Does not evolve into second form'}
							</p>
						)}
						{secondEvo && (
							<img
								className='evo-img'
								src={secondEvo.sprites?.front_default}
								alt={
									secondEvo.name
										? `a picture of the pokemon, ${secondEvo.name}`
										: null
								}
							/>
						)}
					</div>
					<div className='popup-evolution-3'>
						Third Evolution
						{thirdEvo !== 'undefined' && (
							<p className='popup-evo-name'>
								{thirdEvo
									? thirdEvo.name.charAt(0).toUpperCase() +
									  thirdEvo.name.slice(1)
									: 'Does not evolve into third form'}
							</p>
						)}
						{thirdEvo && (
							<img
								className='evo-img'
								src={thirdEvo.sprites?.front_default}
								alt={
									thirdEvo.name
										? `a picture of the pokemon, ${thirdEvo.name}`
										: null
								}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Popup;
//Jeg er klar over at det er lurt å lage portals til popups så man ikke tuller til med z-index til andre objekter
//men siden det kun er et element med z-index tenkte jeg det gikk greit.

//Skulle gjerne hatt en måte å bruke en felles fetch funksjon i stedet for fem, kunne kanskje brukt en fetch
//full av conditionals for å distribuere data riktig, men så ikke for meg hvordan jeg skulle få det til.
