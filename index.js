const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;


const url = 'https://www.theguardian.com/uk'

app.get('/', function (req, res) {
    res.json('This is a webscrapper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.fc-item__title', html).each(function () { //<-- cannot be a function expression
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => {console.log(`Server running on ${PORT}`)});