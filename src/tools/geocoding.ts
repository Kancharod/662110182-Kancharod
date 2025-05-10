export const getGeocoding = async (place: string) : Promise<any> => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${place}`
    const response = await fetch(url);
    const data = await response.json()
    return data.results[0]
}