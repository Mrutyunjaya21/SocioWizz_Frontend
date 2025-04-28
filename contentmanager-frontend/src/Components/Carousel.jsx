import React, { useState } from 'react';
import '../Styles/Carousel.css';
import '../Styles/carouseltemplates/plain.css';
import '../Styles/carouseltemplates/pop.css';
import '../Styles/carouseltemplates/paris.css';

const Carousel = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [previewPages, setPreviewPages] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    // Templates array
    const templates = [
        {
            id: 1,
            name: "Plain",
            thumbnailClass: "plain-thumbnail", // CSS class for the thumbnail
            cssClass: "plain-pages", // CSS class for the preview pages
            pages: [
                { heading: "Plain - Page 1", content: "Content for page 1 of Plain" },
                { heading: "Plain - Page 2", content: "Content for page 2 of Plain" },
                { heading: "Plain - Page 3", content: "Content for page 3 of Plain" },
                { heading: "Plain - Page 4", content: "Content for page 4 of Plain" },
                { heading: "Plain - Page 5", content: "Content for page 5 of Plain" },
            ],
        },
        {
            id: 2,
            name: "Pop",
            thumbnailClass: "pop-thumbnail", // CSS class for the thumbnail
            cssClass: "pop-pages", // CSS class for the preview pages
            pages: [
                { heading: "Pop - Page 1", content: "Content for page 1 of Pop" },
                { heading: "Pop - Page 2", content: "Content for page 2 of Pop" },
                { heading: "Pop - Page 3", content: "Content for page 3 of Pop" },
                { heading: "Pop - Page 4", content: "Content for page 4 of Pop" },
                { heading: "Pop - Page 5", content: "Content for page 5 of Pop" },
            ],
        },
        {
            id: 3,
            name: "Paris",
            thumbnailClass: "paris-thumbnail", // CSS class for the thumbnail
            cssClass: "paris-pages", // CSS class for the preview pages
            pages: [
                { heading: "Paris - Page 1", content: "Content for page 1 of Paris" },
                { heading: "Paris - Page 2", content: "Content for page 2 of Paris" },
                { heading: "Paris - Page 3", content: "Content for page 3 of Paris" },
                { heading: "Paris - Page 4", content: "Content for page 4 of Paris" },
                { heading: "Paris - Page 5", content: "Content for page 5 of Paris" },
            ],
        },
    ];

    // Navigation handlers
    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < previewPages.length - 1) setCurrentPage(currentPage + 1);
    };

    const handleTemplateSelect = (templateId) => {
        const selectedTemplateObj = templates.find((template) => template.id === templateId);
        setSelectedTemplate(selectedTemplateObj.cssClass); // Set the CSS class for pages
        setPreviewPages(selectedTemplateObj.pages); // Load the template's pages
        setCurrentPage(0); // Reset to the first page
    };

    return (
        <div className="carousel-container">
            {/* Left Side Control Panel */}
            <div className="control-panel">
                <h3 className="panel-title">Templates</h3>
                <div className="template-options">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className={`template-block ${
                                selectedTemplate === template.cssClass ? "selected" : ""
                            }`}
                            onClick={() => handleTemplateSelect(template.id)}
                        >
                            <div className={`template-thumbnail ${template.thumbnailClass}`}>
                                {/* Optional placeholder content */}
                                <h2 className="template-thumbnail-heading">{template.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="panel-title">Colour Combination</h3>
                <div className="color-options">
                    <div className="color-block" style={{ backgroundColor: "#6359E9" }}></div>
                    <div className="color-block" style={{ backgroundColor: "#9C27B0" }}></div>
                    <div className="color-block" style={{ backgroundColor: "#FF5722" }}></div>
                </div>

                <h3 className="panel-title">Font</h3>
                <div className="font-options">
                    <div className="font-row">
                        <label>Size:</label>
                        <input className="font-input" type="number" min="8" max="72" />
                    </div>
                    <div className="font-row">
                        <label>Style:</label>
                        <select className="font-input">
                            <option value="normal">Normal</option>
                            <option value="italic">Italic</option>
                            <option value="bold">Bold</option>
                        </select>
                    </div>
                </div>

                <h3 className="panel-title">Headshot</h3>
                <div className="headshot-options">
                    <label>
                        <input type="checkbox" className="headshot-input" /> Use Default
                    </label>
                </div>

                <button className="save-button">Save Post</button>
                <button className="post-button">Post Carousel</button>
            </div>

            {/* Right Side Preview Panel */}
            <div className="preview_panel">
                {/* Navigation Buttons */}
                <button
                    className="preview_carousel-nav-btn prev"
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                >
                    &lt;
                </button>

                <div className="preview_carousel">
                    <div
                        className="preview_carousel-track"
                        style={{
                            transform: `translateX(calc(-100% * ${currentPage} - 10px * ${currentPage}))`,
                        }}
                    >
                        {previewPages.length > 0 ? (
                            previewPages.map((page, index) => (
                                <div
                                    className={`preview_carousel-page ${
                                        index === currentPage
                                            ? "active"
                                            : index === currentPage - 1 || index === currentPage + 1
                                            ? "adjacent"
                                            : ""
                                    } ${selectedTemplate}`}
                                    key={index}
                                >
                                    <h2 className="preview_carousel-heading">{page.heading}</h2>
                                    <p className="preview_carousel-text">{page.content}</p>
                                </div>
                            ))
                        ) : (
                            <div className="preview_carousel-placeholder">
                                <h2>Select a Template</h2>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    className="preview_carousel-nav-btn next"
                    onClick={handleNext}
                    disabled={currentPage === previewPages.length - 1}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
