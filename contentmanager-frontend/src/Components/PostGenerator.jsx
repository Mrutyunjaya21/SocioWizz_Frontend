import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/PostGenerator.css';

const PostGenerator = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState('');
  const [words, setWords] = useState('');
  const [tone, setTone] = useState('Informative');
  const [audience, setAudience] = useState('General');
  const [cta, setCta] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleGeneratePost = () => {
    const postData = {
      topic,
      words,
      tone,
      audience,
      cta,
      keywords,
    };
    console.log('Generated Post:', postData);
    setGeneratedText(`Your post about "${topic}" with tone "${tone}" is ready.`);
  };

  const handleUseText = () => {
    navigate('/post', { state: { generatedText } });
  };

  return (
    <div className="Post-Generator">
      {/* Title */}
      <div className="title-container">
        <h1 className="header-text">AI Post Generator</h1>
      </div>

      {/* Main Content: Two Sections */}
      <div className="content-container">
        {/* Left Section */}
        <div className="left-container">
          <label className="field-label">Enter a topic</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <label className="field-label">Word Count</label>
          <input
            type="number"
            className="input-field"
            placeholder="Word Count"
            value={words}
            onChange={(e) => setWords(e.target.value)}
          />

          <label className="field-label">Tone and Audience</label>
          <div className="tone-audience-row">
            <select
              className="tone-dropdown"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Informative">Informative</option>
               <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Inspirational">Inspirational</option>
              <option value="Persuasive">Persuasive</option>
            </select>

    <select
      className="audience-dropdown"
      value={audience}
      onChange={(e) => setAudience(e.target.value)}
    >
      <option value="General">General</option>
      <option value="Marketers">Marketers</option>
      <option value="Students">Students</option>
      <option value="Developers">Developers</option>
      <option value="Entrepreneurs">Entrepreneurs</option>
    </select>
  </div>

  <div className="keyword-cta-section">
    <div className="field-container">
     <label className="field-label">Add Keywords</label>
      <textarea
        className="textarea-keywords"
        placeholder="Add Keywords (optional)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
     ></textarea>
    </div>

    <div className="field-container">
      <label className="field-label">Call to Action</label>
      <input
        type="text"
      className="cta-input"
      placeholder="Call to Action (optional)"
      value={cta}
        onChange={(e) => setCta(e.target.value)}
      />
    </div>
  </div>


  <button className="generate-button" onClick={handleGeneratePost}>
    Generate Post
  </button>
</div>

        {/* Right Section */}
        <div className="right-container">
          <div className="generated-text">{generatedText}</div>
          <button className="use-text-button" onClick={handleUseText}>
            Use This Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostGenerator;
