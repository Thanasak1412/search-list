import React, { useMemo, useRef, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([""]);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current?.value === "") return;

    const value = inputRef.current?.value;

    if (value === "") return;

    setItems((prev) => {
      return [...prev, value as string];
    });

    inputRef.current!.value = "";
  };

  const filteredItems = useMemo(
    () =>
      items.filter((item) => item.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      Search: <input type="search" value={search} onChange={onChange} />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New item <input type="text" ref={inputRef} />
        <button type="submit">Add</button>
      </form>
      <h3>Items:</h3>
      {filteredItems.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </>
  );
}

export default App;
