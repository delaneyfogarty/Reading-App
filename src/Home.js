import React, { useEffect, useState } from 'react';
import './App.css';
import StoryList from './StoryList';
import { getAllStories } from './services/supabase';

export default function Home() {
  const [stories, setStories] = useState([]);
  const [lastPage, setLastPage] = useState(20);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetch() {
      const allBooks = await getAllStories(page);

      setStories(allBooks.body);
      setLastPage(allBooks.lastPage);
    }

    fetch();
  }, [page]);

  return (
    <>
      <header className="home-header">
        <h2>Page {page}</h2>
        <div className="buttons">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous Page
          </button>
          <button disabled={page >= lastPage} onClick={() => setPage(page + 1)}>
            Next Page
          </button>
        </div>
      </header>
      <body className="home-body">
        <StoryList stories={stories} />
      </body>
    </>
  );
}

// // call text located in supabase
// //
// const [books, setBooks] = useState([]);
//   console.log('books', books);
//   /*
//   const story = await getStoryById(storyId)

//   First use effect to call fetch function
//   */

// useEffect(() => {
//     async function fetch() {
//       const story = await getAllStories();
//       const convertedStory = await convertText(story[0].story_text);
//       console.log(convertedStory, 'converted Story');
//       setBooks(convertedStory);
//     }
//     fetch();
//   }, []);

// <div className="App">
// <div dangerouslySetInnerHTML={{ __html: books }} />

// {/* {books.map((book, i) => (
// <>
//   <div key={book + i} book={book} />
//   <h2>{book.title}</h2>
//   <p>{book.story_text}</p>
// </>
// ))} */}
