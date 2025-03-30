import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  defaultTones,
  platforms,
  formatDate,
  generatePostsFromContent,
  retrieveContentFromSource,
  copyToClipboard
} from '../Utils/repurposeUtils.js';
import '../Styles/Repurpose.css';
import {
  Twitter,
  Linkedin,
  Copy,
  Check,
  Zap,
  Sparkles,
  RefreshCw,
  Loader2
} from 'lucide-react';

const Repurpose = () => {
  const [source, setSource] = useState({ type: 'youtube', url: '', text: '' });
  const [tones, setTones] = useState(defaultTones);
  const [retrievedText, setRetrievedText] = useState('');
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [copiedPostId, setCopiedPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (copiedPostId) {
      const timer = setTimeout(() => setCopiedPostId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedPostId]);

  const toggleTone = (id) => {
    setTones(
      tones.map((tone) => {
        if (id === 'default') return { ...tone, active: tone.id === 'default' };
        if (tone.id === 'default') return { ...tone, active: false };
        return tone.id === id ? { ...tone, active: !tone.active } : tone;
      })
    );
  };

  const retrieveContent = async () => {
    setIsLoading(true);
    try {
      const text = await retrieveContentFromSource(source);
      setRetrievedText(text);
      toast.success('Content retrieved successfully');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePosts = async () => {
    if (!retrievedText) return toast.error('Please retrieve content first');
    const activeTones = tones.filter((t) => t.active).map((t) => t.label);
    if (activeTones.length === 0) return toast.error('Please select a tone');
    setIsLoading(true);
    try {
      const posts = await generatePostsFromContent(retrievedText, activeTones);
      setGeneratedPosts(posts);
      toast.success('Posts generated successfully');
    } catch (e) {
      toast.error('Failed to generate posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (post) => {
    await copyToClipboard(post.content);
    setCopiedPostId(post.id);
    toast.success('Post copied to clipboard');
  };

  const filteredPosts = generatedPosts.filter(
    (p) => selectedPlatform === 'all' || p.platform === selectedPlatform
  );

  return (
    <div className="repurpose-wrapper">
      <div className="repurpose-left">
        <h2 className="title">Repurpose Content</h2>

        <div className="source-row">
          <select
            className="source-type"
            value={source.type}
            onChange={(e) =>
              setSource({ type: e.target.value, url: '', text: '' })
            }
          >
            <option value="youtube">YouTube</option>
            <option value="blog">Blog</option>
            <option value="podcast">Podcast</option>
            <option value="paragraph">Text</option>
          </select>

          {source.type !== 'paragraph' && (
            <input
              type="url"
              className="source-link-input"
              placeholder="Paste your link..."
              value={source.url}
              onChange={(e) => setSource({ ...source, url: e.target.value })}
            />
          )}
        </div>

        {source.type === 'paragraph' && (
          <textarea
            placeholder="Enter your text..."
            value={source.text}
            onChange={(e) => setSource({ ...source, text: e.target.value })}
          />
        )}

        <button
          className="button-retrieve"
          onClick={retrieveContent}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="spin" size={16} /> : <RefreshCw size={16} />} Retrieve
        </button>

        {retrievedText && (
          <>
            <textarea readOnly value={retrievedText} />

            <div className="tone-selector">
              {tones.map((tone) => (
                <span
                  key={tone.id}
                  className={`tone-chip ${tone.active ? 'active' : ''}`}
                  onClick={() => toggleTone(tone.id)}
                >
                  {tone.label}
                </span>
              ))}
            </div>

            <button className="button-generate" onClick={generatePosts} disabled={isLoading}>
              {isLoading ? <Loader2 className="spin" size={16} /> : <Sparkles size={16} />} Generate
            </button>
          </>
        )}
      </div>

      <div className="repurpose-right">
        <div className="platform-tabs">
          <button
            className="button-platform"
            onClick={() => setSelectedPlatform('all')}
          >
            All
          </button>
          {platforms.map((p) => (
            <button
              key={p.id}
              className={`button-platform ${selectedPlatform === p.id ? `active ${p.id}` : ''}`}
              onClick={() => setSelectedPlatform(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="post-list">
          {filteredPosts.length === 0 ? (
            <div className="empty">
              <Zap size={32} />
              <p>No posts yet. Generate to see results.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div className="repurpose-post-card" key={post.id}>
                <div className={`post-header ${post.platform}`}>
                  {post.platform === 'twitter' ? <Twitter size={16} /> : <Linkedin size={16} />}
                  <span>{post.platform}</span>
                </div>
                <p>{post.content}</p>
                {post.hashtags && (
                  <div className="hashtags">
                    {post.hashtags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                )}
                <div className="actions">
                  <button onClick={() => handleCopy(post)}>
                    {copiedPostId === post.id ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Repurpose;
