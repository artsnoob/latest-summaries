// Function to handle tab navigation
function setupTabNavigation() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Function to activate a specific tab
    function activateTab(tabId) {
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all tabs
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Activate the selected tab and content
        const targetSection = document.getElementById(tabId);
        const activeTab = document.querySelector(`.tab-link[data-target="${tabId}"]`);
        
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
    
    // Add click event listeners to tabs
    tabLinks.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            activateTab(targetId);
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
        });
    });
    
    // Check if URL has a hash on page load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const validSectionIds = Array.from(contentSections).map(section => section.id);
        
        if (validSectionIds.includes(targetId)) {
            activateTab(targetId);
            return; // Don't activate default tab if hash exists
        }
    }
    
    // Set the first tab as active by default if no hash in URL
    if (tabLinks.length > 0) {
        const firstTabTarget = tabLinks[0].getAttribute('data-target');
        activateTab(firstTabTarget);
    }
}


// Function to add event listeners to all Read More buttons
function addReadMoreListeners() {
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const contentDiv = this.parentElement;
            const fullContent = decodeURIComponent(contentDiv.getAttribute('data-full-content'));
            const modal = document.createElement('div');
            modal.className = 'content-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <p>${fullContent}</p>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Add event listener to close button
            modal.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Also close when clicking outside the modal content
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
}

// Update the last updated time
document.getElementById('update-time').textContent = new Date().toLocaleString();

// Function to parse Reddit markdown content
function parseRedditContent(markdown) {
    // Extract the generation date
    const dateMatch = markdown.match(/\*Generated on (.*?)\*/);
    const generationDate = dateMatch ? dateMatch[1] : 'Unknown date';
    document.getElementById('reddit-date').textContent = generationDate;
    
    // Update the title in the header
    const headerTitle = document.querySelector('#reddit-section .section-header h2');
    if (headerTitle) {
        headerTitle.innerHTML = '<i class="fab fa-reddit"></i> Reddit Summaries';
    }

    const posts = [];
    const postRegex = /### Post (\d+): (.*?)\n\n\*\*Author\*\*: (.*?)\n\n\*\*Score\*\*: (.*?) \| \*\*Comments\*\*: (.*?)\n\n\*\*Summary\*\*:\n(.*?)\n\n\*\*Original Post\*\*: \[Link\]\((.*?)\)/gs;
    
    let match;
    while ((match = postRegex.exec(markdown)) !== null) {
        posts.push({
            number: match[1],
            title: match[2],
            author: match[3],
            score: match[4],
            comments: match[5],
            summary: match[6],
            link: match[7],
            subreddit: markdown.lastIndexOf('## Subreddit:', match.index) !== -1 ? 
                markdown.substring(
                    markdown.lastIndexOf('## Subreddit:', match.index), 
                    markdown.indexOf('\n', markdown.lastIndexOf('## Subreddit:', match.index))
                ).replace('## Subreddit: ', '') : 'Unknown'
        });
    }

    return posts;
}

// Function to parse RSS markdown content
function parseRSSContent(markdown) {
    // Extract the generation date
    const dateMatch = markdown.match(/\*Generated on (.*?)\*/);
    const generationDate = dateMatch ? dateMatch[1] : 'Unknown date';
    document.getElementById('rss-date').textContent = generationDate;

    const articles = [];
    const articleRegex = /### Article (\d+): (.*?)\n\n\*\*Author\*\*: (.*?)\n\n\*\*Published\*\*: (.*?)\n\n\*\*Summary\*\*:\n(.*?)\n\n\*\*Original Article\*\*: \[Link\]\((.*?)\)/gs;
    
    let match;
    while ((match = articleRegex.exec(markdown)) !== null) {
        articles.push({
            number: match[1],
            title: match[2],
            author: match[3],
            published: match[4],
            summary: match[5],
            link: match[6],
            feed: markdown.lastIndexOf('## Feed:', match.index) !== -1 ? 
                markdown.substring(
                    markdown.lastIndexOf('## Feed:', match.index), 
                    markdown.indexOf('\n', markdown.lastIndexOf('## Feed:', match.index))
                ).replace('## Feed: ', '') : 'Unknown'
        });
    }

    return articles;
}

// Function to parse Twitter markdown content
function parseTwitterContent(markdown) {
    // Extract the generation date
    const dateMatch = markdown.match(/\*Generated on (.*?)\*/);
    const generationDate = dateMatch ? dateMatch[1] : 'Unknown date';
    document.getElementById('twitter-date').textContent = generationDate;

    const tweets = [];
    const tweetRegex = /### (.*?) - (.*?)\n\n([\s\S]*?)\n\n\[Link to Tweet\]\((.*?)\)/g;
    
    let match;
    while ((match = tweetRegex.exec(markdown)) !== null) {
        tweets.push({
            username: match[1],
            date: match[2],
            content: match[3],
            link: match[4]
        });
    }

    return tweets;
}

// Function to create Reddit cards
function createRedditCards(posts) {
    const container = document.getElementById('reddit-content');
    container.innerHTML = '';

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const postContent = post.summary;
        const isLongPost = postContent.length > 300; // Threshold for long posts
        
        card.innerHTML = `
            <div class="card-header">${post.title}</div>
            <div class="card-content" ${isLongPost ? 'data-full-content="' + encodeURIComponent(postContent) + '"' : ''}>
                <p>${postContent}</p>
                ${isLongPost ? '<button class="read-more-btn">Read more</button>' : ''}
            </div>
            <div class="card-footer">
                <span>r/${post.subreddit.replace('r/', '')}</span>
                <a href="${post.link}" target="_blank">View on Reddit</a>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Add event listeners to all "Read more" buttons
    addReadMoreListeners();
}

// Function to create RSS cards
function createRSSCards(articles) {
    const container = document.getElementById('rss-content');
    container.innerHTML = '';

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const articleContent = article.summary;
        const isLongArticle = articleContent.length > 300; // Threshold for long articles
        
        card.innerHTML = `
            <div class="card-header">${article.title}</div>
            <div class="card-content" ${isLongArticle ? 'data-full-content="' + encodeURIComponent(articleContent) + '"' : ''}>
                <p>${articleContent}</p>
                ${isLongArticle ? '<button class="read-more-btn">Read more</button>' : ''}
            </div>
            <div class="card-footer">
                <span>${article.feed}</span>
                <a href="${article.link}" target="_blank">Read Article</a>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Add event listeners to all "Read more" buttons
    addReadMoreListeners();
}

// Function to create Twitter cards
function createTwitterCards(tweets) {
    const container = document.getElementById('twitter-content');
    container.innerHTML = '';

    tweets.forEach(tweet => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Process tweet content to add a read more button if it's too long
        const tweetContent = tweet.content;
        const isLongTweet = tweetContent.length > 400; // Threshold for long tweets
        
        card.innerHTML = `
            <div class="card-header">@${tweet.username}</div>
            <div class="card-content" ${isLongTweet ? 'data-full-content="' + encodeURIComponent(tweetContent) + '"' : ''}>
                <p>${tweetContent}</p>
                ${isLongTweet ? '<button class="read-more-btn">Read more</button>' : ''}
            </div>
            <div class="card-footer">
                <span>${tweet.date}</span>
                <a href="${tweet.link}" target="_blank">View Tweet</a>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Add event listeners to all "Read more" buttons
    addReadMoreListeners();
}

// Function to fetch all summaries from the API
async function fetchSummaries() {
    try {
        const response = await fetch('/api/summaries');
        if (!response.ok) {
            throw new Error('Failed to fetch summaries');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching summaries:', error);
        return null;
    }
}

// Function to initialize the app
async function initApp() {
    try {
        const summaries = await fetchSummaries();
        
        if (summaries?.reddit?.content) {
            const redditPosts = parseRedditContent(summaries.reddit.content);
            createRedditCards(redditPosts);
        } else {
            document.getElementById('reddit-content').innerHTML = '<p class="error">Failed to load Reddit content</p>';
        }
        
        if (summaries?.rss?.content) {
            const rssArticles = parseRSSContent(summaries.rss.content);
            createRSSCards(rssArticles);
        } else {
            document.getElementById('rss-content').innerHTML = '<p class="error">Failed to load RSS content</p>';
        }
        
        if (summaries?.twitter?.content) {
            const tweets = parseTwitterContent(summaries.twitter.content);
            createTwitterCards(tweets);
        } else {
            document.getElementById('twitter-content').innerHTML = '<p class="error">Failed to load Twitter content</p>';
        }

        // Initialize tab navigation
        setupTabNavigation();
    } catch (error) {
        console.error('Error initializing app:', error);
        document.getElementById('reddit-content').innerHTML = '<p class="error">Failed to load content</p>';
        document.getElementById('rss-content').innerHTML = '<p class="error">Failed to load content</p>';
        document.getElementById('twitter-content').innerHTML = '<p class="error">Failed to load content</p>';
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
