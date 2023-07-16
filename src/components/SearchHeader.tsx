import React, { useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export default function SearchHeader() {
  const [text, setText] = useState("");
  const navigte = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigte("/");
  };

  return (
    <>
      <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
        <div>
          <BsYoutube>
            <h1>Youtube</h1>
          </BsYoutube>
        </div>
        <form className="w-full flex justify-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <button>
          <BsSearch></BsSearch>
        </button>
      </header>
      ;
    </>
  );
}
