import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from "lucide-react";
import "../Styles/PostGenerator.css";
import { TextContext } from '../Context/TextContext';

const tones = ["Informative", "Professional", "Casual", "Inspirational", "Persuasive"];
const audiences = ["General", "Marketers", "Students", "Developers", "Entrepreneurs"];

const PostGenerator = () => {
  const navigate = useNavigate();
  const { setGeneratedText } = useContext(TextContext);

  const [topic, setTopic] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [tone, setTone] = useState("Informative");
  const [audience, setAudience] = useState("General");
  const [keywords, setKeywords] = useState('');
  const [cta, setCta] = useState('');
  const [generatedText, setGeneratedTextState] = useState('');

  const handleGeneratePost = async () => {
    const payload = JSON.stringify({
      topic,
      words: wordCount,
      tone,
      audience,
      cta,
      keywords,
    });

    try {
      const response = await fetch('http://localhost:8000/generate-content/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });
      const data = await response.json();
      setGeneratedTextState(data.generated_content);
      console.log(data);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const handleUseText = () => {
    setGeneratedText(generatedText);
    navigate('/post');
  };

  return (
    <div className="post-generator-container">
      {/* Header Section */}
      <div className="generator-header">
        <MessageSquare className="icon" />
        <h1>AI Post Generator</h1>
      </div>

      {/* Content Section */}
      <div className="generator-content">
        {/* Left Panel - Input Form */}
        <div className="generator-left">
          <label className="field-label">Post Topic *</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter topic (e.g. AI in Marketing)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <label className="field-label">Word Count *</label>
          <input
            type="number"
            className="input-field"
            placeholder="Enter word count"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
          />

          {/* Tone Selection */}
          <label className="field-label">Tone</label>
          <div className="selection-group">
            {tones.map((t) => (
              <button
                key={t}
                className={`selection-item ${tone === t ? "selected" : ""}`}
                onClick={() => setTone(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Audience Selection */}
          <label className="field-label">Audience</label>
          <div className="selection-group">
            {audiences.map((a) => (
              <button
                key={a}
                className={`selection-item ${audience === a ? "selected" : ""}`}
                onClick={() => setAudience(a)}
              >
                {a}
              </button>
            ))}
          </div>

          <label className="field-label">Keywords (Optional)</label>
          <textarea
            className="textarea-field"
            placeholder="Enter keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <label className="field-label">Call to Action (Optional)</label>
          <textarea
            className="textarea-field"
            placeholder="Enter a Call to Action"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
          />

          <button className="generate-button" onClick={handleGeneratePost}>
            Generate Post
          </button>
        </div>

        {/* Right Panel - Generated Content */}
        <div className="generator-right">
          <h3 className="generated-header">Generated Post</h3>
          <div className="generated-box">
            {generatedText ? (
              <div className="generated-text">{generatedText}</div>
            ) : (
              <div className="empty-preview">
                <MessageSquare className="preview-icon" />
                <h2>Answer the prompts</h2>
                <p>Get the best preview results by filling in the details.</p>
              </div>
            )}
          </div>
          <button
            className="use-text-button"
            onClick={handleUseText}
            disabled={!generatedText}
          >
            Use This Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostGenerator;
