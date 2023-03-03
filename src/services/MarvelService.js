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

	getAllCharacters = () => {
		return this.gerResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
	}

	getCharacter = async id => {
		const res = await this.gerResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res);
	}

	_transformCharacter = res => {
		return {
			name: res.data.results[0].name,
			desc: res.data.results[0].description,
			thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
			homepage: res.data.results[0].urls[0].url,
			wiki: res.data.results[0].urls[1].url			
		}
	}

}

export default MarvelService;