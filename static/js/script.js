document.addEventListener('DOMContentLoaded', () => {
    // 1. Get ALL necessary elements from index.html
    const youtubeUrlInput = document.getElementById('youtube-url');
    const extractBtn = document.getElementById('extract-btn');
    const clearBtn = document.getElementById('clear-btn');
    const errorMessageDiv = document.getElementById('error-message');
    const videoDetailsSection = document.getElementById('video-details');

    const videoTitle = document.getElementById('video-title');
    const videoThumbnail = document.getElementById('video-thumbnail');
    const thumbnailLink = document.getElementById('thumbnail-link');
    const videoDescription = document.getElementById('video-description');
    const videoId = document.getElementById('video-id');
    const publicationDate = document.getElementById('publication-date');
    const videoDurationFormatted = document.getElementById('video-duration-formatted');
    // Note: We are ignoring transcript buttons/divs for now to focus on the core logic

    // --- Helper function to update the DOM ---
    const displayResults = (data) => {
        // Show the results card (based on your current HTML which hides it initially)
        videoDetailsSection.style.display = 'block'; 

        // Update the HTML elements
        videoTitle.textContent = data.title;
        
        // Update the thumbnail image and link
        videoThumbnail.src = data.thumbnail_url;
        thumbnailLink.href = `https://www.youtube.com/watch?v=${data.videoId}`;

        // FIX: Display the FULL description
        videoDescription.textContent = data.description;

        // Update the detail rows
        videoDurationFormatted.textContent = data.duration_formatted;
        publicationDate.textContent = new Date(data.publishedAt).toLocaleDateString();
        videoId.textContent = data.videoId;

        errorMessageDiv.style.display = 'none'; // Hide error on success
    };

    // --- Helper function to reset the UI ---
    const clearResults = () => {
        youtubeUrlInput.value = '';
        errorMessageDiv.textContent = '';
        errorMessageDiv.style.display = 'none';
        
        // Hide the results card
        videoDetailsSection.style.display = 'none';
        
        // Clear the result fields to prevent old data flicker
        videoTitle.textContent = '';
        videoThumbnail.src = '';
        thumbnailLink.href = '#';
        videoDescription.textContent = '';
        videoId.textContent = '';
        publicationDate.textContent = '';
        videoDurationFormatted.textContent = '';
    };


    // --- MAIN EVENT LISTENER (Core logic to fetch data) ---
    extractBtn.addEventListener('click', async () => {
        const youtubeUrl = youtubeUrlInput.value.trim();
        if (!youtubeUrl) {
            errorMessageDiv.textContent = 'Please enter a valid YouTube URL.';
            errorMessageDiv.style.display = 'block';
            return;
        }

        // Hide previous results and errors
        clearResults();
        
        try {
            const response = await fetch('/extract_details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: youtubeUrl })
            });

            // 1. Check for bad status codes (400, 500 etc.)
            if (!response.ok) {
                const errorData = await response.json();
                // This is the error that likely gets returned to your front-end
                throw new Error(errorData.error || `Server error! Status: ${response.status}`);
            }

            // 2. CRITICAL STEP: Parse the successful JSON response
            const data = await response.json();
            
            // 3. Call the display function
            displayResults(data);

        } catch (error) {
            // Handle network errors or errors thrown above
            errorMessageDiv.textContent = `Error: ${error.message}. Please check URL and API status.`;
            errorMessageDiv.style.display = 'block';
            videoDetailsSection.style.display = 'none'; // Ensure card is hidden on error
            console.error("Fetch error:", error);
        }
    });


    // Add listener for Clear button
    clearBtn.addEventListener('click', clearResults);

    // Ensure UI is clean on load
    clearResults(); // Initial call to hide details and clear fields
});