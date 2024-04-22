import axios from 'axios';


export const translate = async (text, languageFrom, languageTo) => {
    const options = {
        method: 'GET',
        url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
        params: {
          text: text,
          to: languageTo,
          from: languageFrom
        },
        headers: {
          'X-RapidAPI-Key': '03de0ab9a7mshd03b5fe6f939620p1607e0jsn1b4d9e25296a',
          'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        if (response.status !== 200){
            console.log(response);
            throw new Error("Translate call failed. Response status:" + response.status)
          }
          return response.data;
      } catch (error) {
        console.error(error);
      }
}