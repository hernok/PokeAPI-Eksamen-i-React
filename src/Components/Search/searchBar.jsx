import React, { useState, useRef } from 'react';
import FetchForSuggestions from '../Fetch/fetchForSuggestions';

const SearchBar = (props) => {
	// Tekst i søkefelt
	const [search, setSearch] = useState('');
	const [isFocus, setIsFocus] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const inputRef = useRef();
	//Forslag fra ..//fetch/FetchForSuggestions.jsx
	const { suggestions } = FetchForSuggestions();

	return (
		<div className='form-wrapper'>
			<div className='form-container'>
				{/* Søkefelt */}
				<input
					type='text'
					className='input-search'
					placeholder='Search for Pokemon'
					onFocus={() => setIsFocus(true)}
					onBlur={() => {
						if (!isHovered) setIsFocus(false);
					}}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					ref={inputRef}
				/>
				{/* Forslag dropdown */}
				<div className='input-suggestion-wrapper'>
					{isFocus && (
						<div
							className='input-suggestion-container'
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							{suggestions.map((suggestion, i) => {
								const isMatch =
									suggestion.toLowerCase().indexOf(search.toLowerCase()) > -1;
								return (
									<div key={i}>
										{isMatch && (
											<div
												className='input-suggestion'
												onClick={() => {
													setSearch(suggestion);
													inputRef.current.focus();
												}}
											>
												{suggestion}
											</div>
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
			<div className='form-button-container'>
				{/* Søkeknapp */}
				<button
					className='search-button'
					onClick={() => {
						if (search) props.getPokemon(search);
					}}
					type='button'
				>
					Search
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
