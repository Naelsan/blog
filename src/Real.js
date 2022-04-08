import axios from "axios"

export default class Real{

    getRealArticles = function(){
        return axios.get('http://api.mediastack.com/v1/news?access_key=a265a50eb18fcb9a1a3e0f3c50093320&limit=6&languages=fr')
            .then(res => res.data.data)
            .catch(err => console.log(err))
    }

}