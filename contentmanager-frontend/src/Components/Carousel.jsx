import React, { useState } from 'react';
import '../Styles/Carousel.css';
import '../Styles/carouseltemplates/plain.css';
import '../Styles/carouseltemplates/pop.css';
import '../Styles/carouseltemplates/paris.css';
import plainBg from "../Assets/plain.svg";
import popBg from "../Assets/pop.svg";
import parisBg from "../Assets/paris.svg";

// Helper: create a blank page by type
function createPageByType(pageType) {
    switch (pageType) {
        case 'intro':
            return {
                pageType: 'intro',
                title: 'Intro Title',
                subtitle: 'Intro Subtitle',
                description: 'Intro Description text',
            };
        case 'normal':
            return {
                pageType: 'normal',
                title: 'Normal Title',
                description: 'Normal Description text',
            };
        case 'quotes':
            return {
                pageType: 'quotes',
                title: 'Quotes Title',
                quotes: '“Here is a quote text.”',
            };
        case 'outro':
            return {
                pageType: 'outro',
                title: 'Outro Title',
                subtitle: 'Outro Subtitle',
                cta: 'Outro CTA text',
            };
        default:
            // fallback
            return { pageType: 'normal', title: 'New Page', description: '' };
    }
}

const Carousel = () => {
    // Current page index
    const [currentPage, setCurrentPage] = useState(0);

    // The list of pages
    const [previewPages, setPreviewPages] = useState([]);

    // Selected template's CSS class (pop-pages, paris-pages, etc.)
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    // ========== 3 COLOR STATES (default: white BG, black text, black arrow) ==========
    const [colorBg, setColorBg] = useState('#FFFFFF');     // background default white
    const [colorText, setColorText] = useState('#000000'); // text default black
    const [colorArrow, setColorArrow] = useState('#000000'); // arrow default black

    // ========== TEXT ALIGNMENT (left, center, right) ==========
    const [textAlign, setTextAlign] = useState('left');

    // ========== FONT PAIRS (title vs body) ==========
    const fontPairs = [
        { label: 'Arial + Helvetica', title: 'Arial, sans-serif', body: 'Helvetica, sans-serif' },
        { label: 'Georgia + Tahoma', title: 'Georgia, serif', body: 'Tahoma, sans-serif' },
        { label: 'Playfair + Lato', title: '"Playfair Display", serif', body: 'Lato, sans-serif' },
        { label: 'Montserrat + Roboto', title: 'Montserrat, sans-serif', body: 'Roboto, sans-serif' },
        { label: 'Comic Sans + Times', title: '"Comic Sans MS", cursive', body: '"Times New Roman", serif' },
    ];
    const [selectedFontPair, setSelectedFontPair] = useState(0);

    // ========== TEXT SIZE (Small, Medium, Large) ==========
    // We'll store an integer or string (e.g. 'small', 'medium', 'large')
    // then map it to baseFontSize
    const [textSizeOption, setTextSizeOption] = useState('medium');
    const getBaseFontSize = () => {
        let baseSize = 16; // Medium base size
        if (textSizeOption === 'small') baseSize = 14;
        if (textSizeOption === 'large') baseSize = 18;

        const sizes = {
            'intro-title': baseSize * 2.5,    // e.g., medium * 2.5 = 40px
            'intro-subtitle': baseSize * 0.75, // e.g., medium * 0.75 = 12px
            'intro-description': baseSize,     // e.g., medium = 16px
            'normal-title': baseSize * 1.875,  // e.g., medium * 1.875 = 30px
            'normal-description': baseSize,
            'quotes-title': baseSize * 1.875,
            'quotes-box': baseSize,
            'outro-title': baseSize * 2.5,
            'outro-subtitle': baseSize * 0.75,
            'outro-cta': baseSize,
        };
        return sizes;
    };


    const backgroundMap = {
        "plain-pages": plainBg,
        "pop-pages": popBg,
        "paris-pages": parisBg
    };

    

    const [isReordering, setIsReordering] = useState(false); // NEW state for reordering mode

    const totalPages = previewPages.length;
    // TEMPLATES
    const templates = [
        {
            id: 1,
            name: 'Plain',
            thumbnailClass: 'plain-thumbnail',
            cssClass: 'plain-pages',
            pages: [
                { pageType: 'intro', title: 'Plain Intro Title', subtitle: 'Subtitle', description: 'Intro description...' },
                { pageType: 'normal', title: 'Plain Normal Title #1', description: 'Content...' },
                { pageType: 'quotes', title: 'Quotes Title', quotes: '“Sample quote text.”' },
                { pageType: 'normal', title: 'Plain Normal Title #2', description: 'More content...' },
                { pageType: 'outro', title: 'Plain Outro Title', subtitle: 'Outro subtitle', cta: 'Outro CTA here' },
            ],
        },
        {
            id: 2,
            name: 'Pop',
            thumbnailClass: 'pop-thumbnail',
            cssClass: 'pop-pages',
            pages: [
                { pageType: 'intro', title: 'Pop Intro Title', subtitle: 'Pop Intro Subtitle', description: 'Pop Intro Desc...' },
                { pageType: 'normal', title: 'Normal Title #1', description: 'Section Title\nPut your content here.' },
                { pageType: 'quotes', title: '2', quotes: '“Here is a quote text.”' },
                { pageType: 'normal', title: 'Your CTA Title', description: 'Insert your call to action here...' },
                { pageType: 'outro', title: 'Outro Title', subtitle: 'Outro Subtitle', cta: 'Final CTA message' },
            ],
        },
        {
            id: 3,
            name: 'Paris',
            thumbnailClass: 'paris-thumbnail',
            cssClass: 'paris-pages',
            pages: [
                { pageType: 'intro', title: 'Paris Intro Title', subtitle: 'Paris Intro Sub', description: 'Desc...' },
                { pageType: 'normal', title: 'Paris Normal #1', description: 'Hello from page #1' },
                { pageType: 'quotes', title: 'Paris Quotes Title', quotes: '“Paris Quote Text”' },
                { pageType: 'normal', title: 'Paris Normal #2', description: 'Another normal page' },
                { pageType: 'outro', title: 'Paris Outro Title', subtitle: 'Paris Sub', cta: 'CTAs here...' },
            ],
        },
    ];

    // Navigation
    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < previewPages.length - 1) setCurrentPage(currentPage + 1);
    };

    // Template select
    const handleTemplateSelect = (templateId) => {
        const templateObj = templates.find((t) => t.id === templateId);
        if (!templateObj) return;
        setSelectedTemplate(templateObj.cssClass);
        setPreviewPages(JSON.parse(JSON.stringify(templateObj.pages)));
        setCurrentPage(0);
    };

    // Update field
    function updatePageField(index, fieldName, newValue) {
        const updated = [...previewPages];
        updated[index][fieldName] = newValue;
        setPreviewPages(updated);
    }

    // Page actions: Add / Duplicate / Delete
    function createPageByTypeFn(type) {
        return createPageByType(type);
    }
    const handleAddPage = (index) => {
        const newPage = createPageByTypeFn('normal');
        const updated = [...previewPages];
        updated.splice(index + 1, 0, newPage);
        setPreviewPages(updated);
    };
    const handleDeletePage = (index) => {
        if (previewPages.length <= 1) return;
        const updated = [...previewPages];
        updated.splice(index, 1);
        setPreviewPages(updated);
        if (currentPage >= updated.length) {
            setCurrentPage(updated.length - 1);
        }
    };
    const handleDuplicatePage = (index) => {
        const updated = [...previewPages];
        const cloned = { ...updated[index] };
        updated.splice(index + 1, 0, cloned);
        setPreviewPages(updated);
    };

    // Reorder, Save, Post
    const handleReorderClick = () => {
        setIsReordering(true); // Enter reorder mode
    };

    const handleReorderUp = (index) => {
        if (index > 0) {
            const updatedPages = [...previewPages];
            [updatedPages[index], updatedPages[index - 1]] = [updatedPages[index - 1], updatedPages[index]]; // Swap elements
            setPreviewPages(updatedPages);
        }
    };

    const handleReorderDown = (index) => {
        if (index < previewPages.length - 1) {
            const updatedPages = [...previewPages];
            [updatedPages[index], updatedPages[index + 1]] = [updatedPages[index + 1], updatedPages[index]]; // Swap elements
            setPreviewPages(updatedPages);
        }
    };

    const handleReorderDone = () => {
        setIsReordering(false); // Exit reorder mode
    };


    const handleSavePost = () => {
        alert('Save Post placeholder');
    };
    const handlePostCarousel = () => {
        alert('Post Carousel placeholder');
    };

    // Color presets: Only 1 header and 4 color styles => Let's define a simpler preset
    // We'll do "Default Styles" with 4 combos
    const colorPresets = {
        'Combinations': [
            ['#FFFFFF', '#FFFFFF', '#000000'], // White bg (future), white text, Black icons
            ['#F5F5F5', '#333333', '#FF5733'], // Soft Gray bg, Dark Gray text, Bright Red-Orange icons
            ['#E3F2FD', '#1E1E1E', '#2979FF'], // Light Blue bg, Almost Black text, Vivid Blue icons
            ['#FFEBEE', '#4A4A4A', '#D32F2F'], // Soft Pink bg, Charcoal text, Deep Red icons
            ['#FFF3E0', '#3E2723', '#FF9800'], // Light Cream bg, Dark Brown text, Bright Orange icons
            ['#F1F8E9', '#2E7D32', '#81C784'], // Pale Green bg, Forest Green text, Soft Green icons
            ['#ECEFF1', '#263238', '#607D8B'], // Cool Gray bg, Deep Blue-Gray text, Muted Blue-Grey icons
            ['#FCE4EC', '#880E4F', '#E91E63'], // Blush Pink bg, Deep Maroon text, Bright Pink icons
                ],
    };
    const applyColorPreset = (colors) => {
        setColorBg(colors[0]);
        setColorText(colors[1]);
        setColorArrow(colors[2]);
    };

    // Render
    const baseFontSizes = getBaseFontSize(); // small=14, medium=16, large=20


    return (
        <div className="carousel-container">
            {/* CONTROL PANEL */}
            <div className="control-panel">
                {!isReordering ? ( // Conditionally render control panel OR reorder UI
                    <>
                        <h3 className="panel-title">Templates</h3>
                        <div className="template-options">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    className={`template-block ${selectedTemplate === template.cssClass ? 'selected' : ''}`}
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    <div 
                                        className="template-thumbnail"
                                        style={{ 
                                            backgroundImage: `url(${backgroundMap[template.cssClass]})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <h2 className="template-thumbnail-heading">{template.name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Colors */}
                        <h3 className="panel-title">Colors</h3>
                        <div className="color-custom-row">
                            <input
                                type="color"
                                value={colorBg}
                                onChange={(e) => setColorBg(e.target.value)}
                                title="Background Color"
                            />
                            <input
                                type="color"
                                value={colorText}
                                onChange={(e) => setColorText(e.target.value)}
                                title="Text Color"
                            />
                            <input
                                type="color"
                                value={colorArrow}
                                onChange={(e) => setColorArrow(e.target.value)}
                                title="Arrow Color"
                            />
                        </div>

                        {/* Color Presets */}
                        <div className="color-presets-container">
                            {Object.keys(colorPresets).map((groupName) => (
                                <div key={groupName} className="color-preset-group">
                                    <div className="color-preset-group-title">{groupName}</div>
                                    <div className="color-preset-row">
                                        {colorPresets[groupName].map((colorsArr, idx) => (
                                            <div
                                                key={idx}
                                                className="color-preset-box"
                                                onClick={() => applyColorPreset(colorsArr)}
                                            >
                                                {colorsArr.map((c, i) => (
                                                    <div key={i} className="color-swatch" style={{ backgroundColor: c }} />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Font Size: 3 icons for Small, Medium, Large */}
                        <h3 className="panel-title">Text Size</h3>
                        <div className="text-size-icons">
                            <button
                                className={`text-size-icon ${textSizeOption === 'small' ? 'active' : ''}`}
                                onClick={() => setTextSizeOption('small')}
                                title="Small Text"
                            >
                                <span style={{ fontSize: '0.8em' }}>A</span>
                            </button>
                            <button
                                className={`text-size-icon ${textSizeOption === 'medium' ? 'active' : ''}`}
                                onClick={() => setTextSizeOption('medium')}
                                title="Medium Text"
                            >
                                <span>A</span>
                            </button>
                            <button
                                className={`text-size-icon ${textSizeOption === 'large' ? 'active' : ''}`}
                                onClick={() => setTextSizeOption('large')}
                                title="Large Text"
                            >
                                <span style={{ fontSize: '1.2em' }}>A</span>
                            </button>
                        </div>

                        {/* Text Alignment icons (left, center, right) - Using Unicode icons */}
                        <h3 className="panel-title">Text Alignment</h3>
                        <div className="text-align-options-icons">
                            <button
                                className={`align-icon ${textAlign === 'left' ? 'active' : ''}`}
                                onClick={() => setTextAlign('left')}
                                title="Align Left"
                            >
                                ≡
                            </button>
                            <button
                                className={`align-icon ${textAlign === 'center' ? 'active' : ''}`}
                                onClick={() => setTextAlign('center')}
                                title="Align Center"
                            >
                                ≢
                            </button>
                            <button
                                className={`align-icon ${textAlign === 'right' ? 'active' : ''}`}
                                onClick={() => setTextAlign('right')}
                                title="Align Right"
                            >
                                ≣
                            </button>
                        </div>

                        {/* Font Pairs */}
                        <h3 className="panel-title">Font Pair</h3>
                        <div className="font-selection">
                            <select
                                className="styled-dropdown"
                                value={selectedFontPair}
                                onChange={(e) => setSelectedFontPair(parseInt(e.target.value, 10))}
                            >
                                {fontPairs.map((fp, idx) => (
                                    <option key={idx} value={idx}>
                                        {fp.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Reorder button */}
                        <div className="reorder-container" onClick={handleReorderClick} title="Reorder Slides">
                            <span className="reorder-icon">⇅</span>
                            <span className="reorder-text">Order</span>
                        </div>

                        {/* Save & Post buttons */}
                        <div className="save-post-row">
                            <button className="save-button" onClick={handleSavePost}>
                                Save Post
                            </button>
                            <button className="post-button" onClick={handlePostCarousel}>
                                Post Carousel
                            </button>
                        </div>
                    </>
                ) : ( // Render Reorder UI when isReordering is true
                    <div className="reorder-mode">
                        <h3 className="panel-title">Reorder Slides</h3>
                        <ul className="reorder-list">
                            {previewPages.map((page, index) => (
                                <li key={index} className="reorder-item">
                                    <span>Slide {index + 1} ({page.pageType})</span>
                                    <div className="reorder-controls">
                                        <button onClick={() => handleReorderUp(index)} disabled={index === 0}>
                                            ▲ {/* Up arrow Unicode */}
                                        </button>
                                        <button onClick={() => handleReorderDown(index)} disabled={index === previewPages.length - 1}>
                                            ▼ {/* Down arrow Unicode */}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="reorder-done-button" onClick={handleReorderDone}>Done</button>
                    </div>
                )}

            </div>

            {/* ========== PREVIEW PANEL ========== */}

            <div className="preview_carousel">
                <button className="preview_carousel-nav-btn prev" onClick={handlePrev} disabled={currentPage === 0}>
                            {"<"}
                 </button>
                     <div className="preview_carousel-track" style={{
                        width: `calc(35vw * ${previewPages.length}`,
                        transform: `translateX(calc(-35vw * ${currentPage}))`,
                        }}>
                            {previewPages.length > 0 ? (
                                previewPages.map((page, index) => {
                                    // Decide if Add, Duplicate, Delete are active or not
                                    let canAdd = true, canDuplicate = true, canDelete = true;
                                    if (page.pageType === 'intro') {
                                        canDuplicate = false;
                                        canDelete = false;
                                    } else if (page.pageType === 'outro') {
                                        canAdd = false;
                                        canDuplicate = false;
                                        canDelete = false;
                                    }

                                    // Page number logic
                                    let pageNumber = '';
                                    if (page.pageType === 'normal' || page.pageType === 'quotes') {
                                        pageNumber = `${index}`;
                                    }

                                    // Determine if the page is 'prev', 'active', or 'next'
                                    let pageClass = index === currentPage
                                        ? 'active'
                                        : index === currentPage - 1
                                        ? 'prev'
                                        : index === currentPage + 1
                                        ? 'next'
                                        : '';

                                    return (
                                        <div
                                            key={index}
                                            className={`preview_carousel-page ${selectedTemplate || ''} ${pageClass}`}
                                            style={{
                                                backgroundImage: `url(${backgroundMap[selectedTemplate] || plainBg})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                                '--bgColor': colorBg,
                                                '--textColor': colorText,
                                                '--arrowColor': colorArrow,
                                                '--titleFont': fontPairs[selectedFontPair].title,
                                                '--bodyFont': fontPairs[selectedFontPair].body,
                                                '--textAlign': textAlign,
                                                '--baseFontSize': `${baseFontSizes[page.pageType + '-' + (page.pageType === 'quotes' ? 'box' : 'description')]}px`
                                            }}
                                        >
                                            {/* Action Icons */}
                                            <div className="slide-icons">
                                                <span
                                                    className={`slide-icon add ${!canAdd ? 'disabled' : ''}`}
                                                    onClick={() => canAdd && handleAddPage(index)}
                                                    title="Add Page"
                                                >
                                                    +
                                                </span>
                                                <span
                                                    className={`slide-icon duplicate ${!canDuplicate ? 'disabled' : ''}`}
                                                    onClick={() => canDuplicate && handleDuplicatePage(index)}
                                                    title="Duplicate Page"
                                                >
                                                    ⎘
                                                </span>
                                                <span
                                                    className={`slide-icon delete ${!canDelete ? 'disabled' : ''}`}
                                                    onClick={() => canDelete && handleDeletePage(index)}
                                                    title="Delete Page"
                                                >
                                                    🗑
                                                </span>
                                            </div>

                                            {/* Intro Page */}
                                            {page.pageType === 'intro' && (
                                                <div className="intro-container">
                                                    <p
                                                        className="intro-subtitle"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'subtitle', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['intro-subtitle']}px` }}
                                                    >
                                                        {page.subtitle}
                                                    </p>
                                                    <h2
                                                        className="intro-title"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'title', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['intro-title']}px` }}
                                                    >
                                                        {page.title}
                                                    </h2>
                                                    <p
                                                        className="intro-description"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'description', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['intro-description']}px` }}
                                                    >
                                                        {page.description}
                                                    </p>
                                                    <div className="brand-icon">[Brand Icon / Logo]</div>
                                                    <div className="next-arrow" style={{ backgroundColor: 'var(--arrowColor)' }}>→</div>
                                                </div>
                                            )}

                                            {/* Normal Page */}
                                            {page.pageType === 'normal' && (
                                                <div className="normal-container">
                                                    {pageNumber && <div className="page-number-badge">{pageNumber}</div>}
                                                    <h2
                                                        className="normal-title"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'title', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['normal-title']}px` }}
                                                    >
                                                        {page.title}
                                                    </h2>
                                                    <p
                                                        className="normal-description"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'description', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['normal-description']}px` }}
                                                    >
                                                        {page.description}
                                                    </p>
                                                    <div className="brand-icon">[Brand Icon]</div>
                                                </div>
                                            )}

                                            {/* Quotes Page */}
                                            {page.pageType === 'quotes' && (
                                                <div className="quotes-container">
                                                    {pageNumber && <div className="page-number-badge">{pageNumber}</div>}
                                                    <h2
                                                        className="quotes-title"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'title', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['quotes-title']}px` }}
                                                    >
                                                        {page.title}
                                                    </h2>
                                                    <p
                                                        className="quotes-box"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'quotes', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['quotes-box']}px` }}
                                                    >
                                                        {page.quotes}
                                                    </p>
                                                    <div className="brand-icon">[Brand Icon]</div>
                                                </div>
                                            )}

                                            {/* Outro Page */}
                                            {page.pageType === 'outro' && (
                                                <div className="outro-container">
                                                    <p
                                                        className="outro-subtitle"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'subtitle', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['outro-subtitle']}px` }}
                                                    >
                                                        {page.subtitle}
                                                    </p>
                                                    <h2
                                                        className="outro-title"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'title', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['outro-title']}px` }}
                                                    >
                                                        {page.title}
                                                    </h2>
                                                    <p
                                                        className="outro-cta"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) => updatePageField(index, 'cta', e.target.textContent)}
                                                        style={{ fontSize: `${baseFontSizes['outro-cta']}px` }}
                                                    >
                                                        {page.cta}
                                                    </p>
                                                    <div className="brand-icon">[Brand Icon]</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                            <div className="preview_carousel-placeholder">
                                <h2>Select a Template</h2>
                            </div>
                                )}

                        </div>
                    </div>

                    <button className="preview_carousel-nav-btn next" onClick={handleNext} disabled={currentPage === previewPages.length - 1}>
                        {">"}
                    </button>
                </div>
    );
};

export default Carousel;






