



class MarvelService  {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=bfc321ee8cfc1da68e8f654b81043d97'
  getResource = async (url) => {
    let res = await fetch(url);
  
    if(!res.ok){
      throw new Error (`Could not fetch ${url}`)
    }
    return await res.json();
  }

  getAllCharcters = () => {
    const res = this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter)
  }

  getCharcter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description:  char.description,
      thumbnail:  char.thumbnail.path + '.' +  char.thumbnail.extension,
      homepage:  char.urls[0].url,
      wiki:  char.urls[1].url 
    }
  }
}export default MarvelService;