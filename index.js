const axios = require('axios');
const reto = 3;

/* STARTS DIVISION FUNCTIONS */
function divideEntreDos(numberList) {
	return numberList.map((number) => number / 2);
}
/* END DIVISION FUNCTIONS */

/* STARTS HELADOS FUNCTIONS */
function getHeladosVerdes(heladosList) {
	return heladosList.filter((helado) => helado.color === 'verde');
}
/* END HELADOS FUNCTIONS */

/* STARTS MOVIES FUNCTIONS */
function formatDate(date) {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function getCleanMovieData(movieDataList) {
	return movieDataList.map((movie) => {
		return {
			id: movie['imdbID'],
			title: movie['Title'],
			actors: movie['Actors'].split(", "),
			released: movie['Released'],
		}
	});
}

function getIdTitleList(movieDataList) {
	return movieDataList.map((movie) => {
		return {
			id: movie['imdbID'],
			title: movie['Title'],
		}
	});
}

function getUpperCaseTitle(movieDataList) {
	return movieDataList.map((movie) => {
		return {
			id: movie['imdbID'],
			title: movie['Title'].toUpperCase(),
			actors: movie['Actors'].split(", "),
			released: movie['Released'],
		}
	});
}

function getLatestMovie(movieDataList) {
	let latestMovie = movieDataList.reduce((movie1, movie2) => {
		const date_1 = new Date(Date.parse(movie1['Released']));
		const date_2 = new Date(Date.parse(movie2['Released']));

		return (date_1 > date_2) ? movie1 : movie2;
	});
	return {
		id: latestMovie['imdbID'],
		title: latestMovie['Title'],
		actors: latestMovie['Actors'].split(", "),
		released: latestMovie['Released'],
	};
}

async function getMovies() {
	const moviesList = [
		'Interstellar',
		'Avengers Endgame',
		'The Martian',
		'Reservoir Dogs',
		'The Lord Of The Rings: The Fellowship of the Ring',
		'The Lord Of The Rings: The Two Towers',
		'The Lord Of The Rings: The Return of the King',
		'The Blair Witch Project',
		'Pulp Fiction',
		'From Dusk Till Dawn',
	]

	const moviePromises = () => Promise.all(
		moviesList.map(async (movie) => {
			const escaped_title = encodeURIComponent(movie);
			const result = await axios({
				url: `http://www.omdbapi.com/?t=${escaped_title}&apikey=c89c393d`
			});
			return result.data;
		})
	)

	const movieDataList = await moviePromises();
	const cleanMovieList = getCleanMovieData(movieDataList);
	const upperCaseTitle = getUpperCaseTitle(movieDataList);
	const latestMovie = getLatestMovie(movieDataList);
	const idTitleList = getIdTitleList(movieDataList);

	console.log({
		"cleanMovieList": cleanMovieList,
		"upperCaseTitle": upperCaseTitle,
		"latestMovie": latestMovie,
		"idTitleList": idTitleList,
	});
}
/* ENDS MOVIES FUNCTIONS */

switch (reto) {
	case 1:
		getMovies();
		break;

	case 2:
		console.log(
			divideEntreDos([1024,512,256,128,64,32,16,8,4,2,1])
		);
		break;
	case 3:
		const helados = [
			{ sabor: 'vainilla', color: 'amarillo' },
			{ sabor: 'fresa', color: 'rojo' },
			{ sabor: 'chocolate', color: 'café' },
			{ sabor: 'mora', color: 'morado' },
			{ sabor: 'pera', color: 'verde' },
			{ sabor: 'menta', color: 'verde' },
		];
		console.log(getHeladosVerdes(helados));
		break;
}
