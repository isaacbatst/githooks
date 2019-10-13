import React, { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/users/isaacbatst/repos');
      const data = await response.json();
      setRepositories(data);
    }
    fetchData();
  }, []);

  useEffect(()=> {
    const favoriteRepos = repositories.filter(repo => repo.favorite);

    document.title = `${favoriteRepos.length} favorites`
  },[repositories])

  function handleFavorite(id){
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepositories);
  };

  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite ? <span>(Favorite)</span> : ""}
            <button onClick={() => handleFavorite(repo.id) }>Star</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
