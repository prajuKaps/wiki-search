import { useState} from "react";
import axios from 'axios';

function App() {
  const [search, setSearch] = useState(""); //From input box we are saving the search input in search variable
  
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const MAX_RESULTS_PER_PAGE = 10;

  function next(){
    setCurrentPage(currentPage + 1);
    searchWikipedia();
  }

  const previous = () =>{
    setCurrentPage(currentPage - 1);
    searchWikipedia();
  }

  const searchWikipedia = async () => {
    const response = await axios.get(
      `wikiApi?action=query&format=json&list=search&srsearch=${search}&sroffset=${currentPage * MAX_RESULTS_PER_PAGE}`)
  
      setResults(response.data.query.search);
      setSearchInfo(response.data.query.searchinfo);
      console.log('Response', response);
  }

  const handleSearch = async e => {
    e.preventDefault();
    searchWikipedia();
  }

  return (
    <div className="App">
      <header>
        <h1>Wiki Search</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input 
            type="search" 
            placeholder="What are you looking for ?"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        {(searchInfo.totalhits) ? <p>Search ResultS: {searchInfo.totalhits}</p> : '' }
      </header>
      <div className="results">
        {results.map((res, i) =>{
          return (
            <div className="result" key={i}>
                <h3>{res.title}</h3>
                <p dangerouslySetInnerHTML={{__html:res.snippet}}></p>
                <a href={`https://en.wikipedia.org/?curid=${res.pageid}`} target="_blank" rel="noreferrer">Read more</a>
            </div>
          )
        })}
      </div>
      <footer>
        <div className="pagination" id="pagination">
          <button id="previous" disabled={currentPage === 0} className="page-link" onClick={previous}>&laquo; Previous</button>
          <button id="next" disabled={!results.length} className="page-link" style={{paddingLeft: '35px', paddingRight: '30px'}} onClick={next}>Next &raquo;</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
