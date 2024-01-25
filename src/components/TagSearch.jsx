import React, { useState } from 'react';

const TagSearch = ({ tagSearchContainerId, searchInputId }) => {
  const [tags, setTags] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      addTag(event.target.value.trim());
      event.target.value = '';
    }
  };

  const addTag = (tagText) => {
    setTags((prevTags) => [...prevTags, tagText]);
  };

  const removeTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  return (
    <div className='searchs1'>
      <input
        type="text"
        id={searchInputId}
        onKeyDown={handleKeyDown}
        placeholder="Add tags..."
      >
        <div id={tagSearchContainerId}>
        {tags.map((tag, index) => (
          <div key={index} className="tagContainer">
            <span className="tagText">{tag}</span>
            <button className="removeTag" onClick={() => removeTag(index)}>
              X
            </button>
          </div>
        ))}
      </div>
      </input>
      
    </div>
  );
};

export default TagSearch;
