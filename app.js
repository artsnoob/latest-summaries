// Paths to the latest files
const PATHS = {
    reddit: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Reddit Scraper/redditoutput/reddit20250323.md',
    rss: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Reddit Scraper/rssoutput/rss20250323.md',
    twitter: '/Users/milanboonstra/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/Apps/Logging/RSS Twitter Scraper/twitteroutput/twitter20250323.md'
};

// Update the last updated time
document.getElementById('update-time').textContent = new Date().toLocaleString();

// Function to fetch and parse the markdown content
async function fetchMarkdownContent(path) {
    try {
        const response = await fetch(`file://${path}`);
        if (!response.ok) {
            throw new Error(`Failed to load file: ${path}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading file:', error);
        return null;
    }
}

// Function to parse Reddit markdown content
function parseRedditContent(markdown) {
    // Extract the generation date
    const dateMatch = markdown.match(/\*Generated on (.*?)\*/);
    const generationDate = dateMatch ? dateMatch[1] : 'Unknown date';
    document.getElementById('reddit-date').textContent = generationDate;

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
        
        card.innerHTML = `
            <div class="card-header">${post.title}</div>
            <div class="card-content">
                <p>${post.summary}</p>
            </div>
            <div class="card-footer">
                <span>${post.subreddit}</span>
                <a href="${post.link}" target="_blank">View on Reddit</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Function to create RSS cards
function createRSSCards(articles) {
    const container = document.getElementById('rss-content');
    container.innerHTML = '';

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-header">${article.title}</div>
            <div class="card-content">
                <p>${article.summary}</p>
            </div>
            <div class="card-footer">
                <span>${article.feed}</span>
                <a href="${article.link}" target="_blank">Read Article</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Function to create Twitter cards
function createTwitterCards(tweets) {
    const container = document.getElementById('twitter-content');
    container.innerHTML = '';

    tweets.forEach(tweet => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-header">@${tweet.username}</div>
            <div class="card-content">
                <p>${tweet.content}</p>
            </div>
            <div class="card-footer">
                <span>${tweet.date}</span>
                <a href="${tweet.link}" target="_blank">View Tweet</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Function to initialize the app
async function initApp() {
    // Since we're running locally and can't fetch files directly from file:// URLs in a browser,
    // we'll simulate this by having the server-side script read the files and embed them in JS variables

    // In a real application, you'd want to use a server-side script to read these files
    // For now, we can demonstrate the structure with included sample data
    
    // Simulating reading files from the paths
    // In reality, this would need to be done server-side and served to the client
    
    // Read the embedded files and parse them
    try {
        const redditContent = await window.fs.readFile(PATHS.reddit, { encoding: 'utf8' });
        const redditPosts = parseRedditContent(redditContent);
        createRedditCards(redditPosts);
    } catch (error) {
        console.error('Error loading Reddit content:', error);
        document.getElementById('reddit-content').innerHTML = '<p class="error">Failed to load Reddit content</p>';
    }

    try {
        const rssContent = await window.fs.readFile(PATHS.rss, { encoding: 'utf8' });
        const rssArticles = parseRSSContent(rssContent);
        createRSSCards(rssArticles);
    } catch (error) {
        console.error('Error loading RSS content:', error);
        document.getElementById('rss-content').innerHTML = '<p class="error">Failed to load RSS content</p>';
    }

    try {
        const twitterContent = await window.fs.readFile(PATHS.twitter, { encoding: 'utf8' });
        const tweets = parseTwitterContent(twitterContent);
        createTwitterCards(tweets);
    } catch (error) {
        console.error('Error loading Twitter content:', error);
        document.getElementById('twitter-content').innerHTML = '<p class="error">Failed to load Twitter content</p>';
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
