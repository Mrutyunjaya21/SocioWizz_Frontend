// repurposeUtils.js

// Format date like "Jan 15"
export const formatDate = (date) => {
    if (!date) return '';
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Check if tone is active
  export const isToneActive = (activeTones, toneName) => {
    return activeTones.includes(toneName);
  };
  
  // Default tones list
  export const defaultTones = [
    { id: 'default', label: 'Default', active: true },
    { id: 'humorous', label: 'Humorous', active: false },
    { id: 'formal', label: 'Formal', active: false },
    { id: 'casual', label: 'Casual', active: false },
    { id: 'informative', label: 'Informative', active: false },
    { id: 'persuasive', label: 'Persuasive', active: false },
    { id: 'serious', label: 'Serious', active: false },
    { id: 'friendly', label: 'Friendly', active: false },
    { id: 'inspiring', label: 'Inspiring', active: false },
  ];
  
  // Platforms used for post generation
  export const platforms = [
    { id: 'twitter', name: 'X / Twitter', icon: 'Twitter', color: 'social-twitter' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', color: 'social-linkedin' },
  ];
  
  // Generate a unique post ID
  export const generateUniqueId = (platform) => {
    return `${platform}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  
  // Copy text to clipboard
  export const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text);
  };
  
  // Mock: retrieve content from a given source
  export const retrieveContentFromSource = async (source) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  
    if (!source.url && source.type !== 'paragraph') {
      throw new Error('Please enter a valid URL');
    }
  
    if (source.type === 'paragraph' && !source.text) {
      throw new Error('Please enter some text to repurpose');
    }
  
    switch (source.type) {
      case 'youtube':
        return "Simulated YouTube transcript: Tips for creators and marketers in 2024...";
      case 'blog':
        return "Summary of a blog post on AI content creation, trends, and authenticity.";
      case 'podcast':
        return "Excerpt from podcast: Evolution of social algorithms and platform strategy.";
      default:
        return source.text || '';
    }
  };
  
  // Mock: generate social media posts
  export const generatePostsFromContent = async (retrievedText, activeTones) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    const posts = [];
  
    posts.push({
      id: generateUniqueId('twitter'),
      platform: 'twitter',
      content: `🔥 Insight: Repurpose smartly to scale content. ${
        isToneActive(activeTones, 'Humorous') ? 'Even algorithms deserve a laugh 😂' : ''
      }`,
      hashtags: ['#ContentCreation', '#MarketingTips'],
      imagePrompt: 'Creator working on laptop across platforms',
      scheduledFor: null,
    });
  
    posts.push({
      id: generateUniqueId('twitter'),
      platform: 'twitter',
      content: `“Content is king, distribution is queen.” ${
        isToneActive(activeTones, 'Casual') ? 'And she runs the empire! 👑' : ''
      }`,
      hashtags: ['#SocialMedia', '#ContentStrategy'],
      imagePrompt: 'Royal chess pieces over a content calendar',
      scheduledFor: null,
    });
  
    posts.push({
      id: generateUniqueId('twitter'),
      platform: 'twitter',
      content: `📈 Repurposing helps increase ROI by 300%. ${
        isToneActive(activeTones, 'Informative') ? 'Data doesn’t lie.' : ''
      }`,
      hashtags: ['#CreatorEconomy', '#DigitalMarketing'],
      imagePrompt: 'Bar graph of content reach across channels',
      scheduledFor: null,
    });
  
    posts.push({
      id: generateUniqueId('linkedin'),
      platform: 'linkedin',
      content: `🚀 How our team scaled content using smart repurposing. ${
        isToneActive(activeTones, 'Persuasive') ? 'If you’re not doing this, you’re leaving impact on the table.' : ''
      }\n\nHere’s our playbook:\n1. Repurpose longform\n2. Schedule smartly\n3. Track performance`,
      hashtags: ['#GrowthStrategy', '#ContentOps'],
      imagePrompt: 'Workflow board showing content strategy tasks',
      scheduledFor: null,
    });
  
    posts.push({
      id: generateUniqueId('linkedin'),
      platform: 'linkedin',
      content: `📊 60% less effort, 300% more visibility.\n\nThat’s what content repurposing did for us. ${
        isToneActive(activeTones, 'Serious') ? 'And the numbers speak louder than words.' : ''
      }`,
      hashtags: ['#MarketingROI', '#LinkedInTips'],
      imagePrompt: 'Marketing team analyzing campaign data',
      scheduledFor: null,
    });
  
    return posts;
  };
  