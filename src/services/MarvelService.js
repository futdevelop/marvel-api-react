class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=5a43ed84cfe77b9c20f37fa19c21badb';

	gerResource = async (url) => {
		let res = await fetch(url);

		if(!res.ok) {
			throw new Error(`Couldnt fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.gerResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`) //обєкт данних
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async id => {
		const res = await this.gerResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = char => {
		return {
			name: char.name,
			desc: char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url			
		}
	}

}

export default MarvelService;