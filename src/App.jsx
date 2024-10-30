import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [newsData, setNewsData] = useState([])
  const [category, setCategory] = useState("general")

  async function fetchData() {
    let URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=0ec2d710049643a5b5a889c81cfd5ef6`;
    let response = await fetch(URL)
    let data = await response.json()
    setNewsData(data.articles)
    console.log(data)

  }
  useEffect(() => {
    fetchData()

  }, [])
  useEffect(() => {
    fetchData()

  }, [category])

  useEffect(() => {
    console.log(newsData)
  }, [newsData])

  function categorySelection(e) {
    setCategory(e.target.innerHTML.toLowerCase())

  }

  return (
    <>
      <nav>
        <div className="logo">
          <span className='main-name'>NewsGet</span> <span className='tag-line'>Get news 24/7</span>
        </div>
        <ul className='categories'>
          <li onClick={(e) => { categorySelection(e) }}>Business</li>
          <li onClick={(e) => { categorySelection(e) }}>Entertainment</li>
          <li onClick={(e) => { categorySelection(e) }}>General</li>
          <li onClick={(e) => { categorySelection(e) }}>Health</li>
          <li onClick={(e) => { categorySelection(e) }}>Science</li>
          <li onClick={(e) => { categorySelection(e) }}>Sports</li>
          <li onClick={(e) => { categorySelection(e) }}>technology</li>
        </ul>
      </nav>
      <div className="container">
        <h3 className='title-news'>Latest News : <span>{category.toUpperCase()}</span></h3>
        <div className="news-container">
          {newsData.map((news) => {
            return news.title.length > 13 && <div className="news-card">
              <div className="img">
                <img src={news.urlToImage ? news.urlToImage : "./src/assets/default.png"} width="250" alt="" />
              </div>
              <div className="title">
                {news.title.slice(0, 50)}...
              </div>
              <div className="description">{news.description ? news.description?.slice(0, 50) : news.content?.slice(0, 50)}...</div>
              <div className="content">
                {news.content}
              </div>
              <div>
                <span className="date">{news.publishedAt.slice(0, 10)}</span>
                <span className='read-more'><a href={news.url} target='_blank'>Read more</a></span>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
