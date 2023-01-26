const DisplayPokemon = ({ id, name, image, typeOne, typeTwo, func }) => {
	//Lager kort med data fra props
	return (
		<div className='pokemon-container' onClick={func}>
			<div className='info-box'>
				<p className='name'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
				<p className='id'>#{id}</p>
			</div>
			<div className='image-box'>
				<img
					className='image'
					src={image}
					alt={('a picture of the pokemon, ', { name })}
				/>
				<div className='type-div'>
					<p className={'type-' + typeOne} id='type'>
						{typeOne.charAt(0).toUpperCase() + typeOne.slice(1)}
					</p>
					<p className={'type-' + typeTwo} id='type'>
						{typeTwo !== null &&
							typeTwo?.charAt(0).toUpperCase() + typeTwo.slice(1)}
					</p>
				</div>
			</div>
		</div>
	);
};
export default DisplayPokemon;
