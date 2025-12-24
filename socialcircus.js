// Sample posts data
const samplePosts = [
    {
        type: 'blog',
        content: "Just finished my first week at CLU! 🎓 The campus is amazing and I've already made some great friends. Can't wait to see what this semester brings!",
        author: "Sarah Mitchell",
        time: "2 hours ago"
    },
    {
        type: 'blog',
        content: "Pro tip for all freshmen: The library on the 3rd floor has the best study spots with a view! 📚 Also, the café nearby makes excellent coffee ☕",
        author: "Mike Thompson",
        time: "5 hours ago"
    }
];

// Load sample posts on page load
document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    
    samplePosts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
});

// Function to create a post element
function createPostElement(postData) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    
    let content = '';
    if (postData.type === 'image' && postData.imageUrl) {
        content = `<img src="${postData.imageUrl}" alt="User Upload">`;
    }
    
    content += `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <strong style="font-size: 1.2em;">${postData.author || 'Anonymous'}</strong>
            <span style="color: #666; font-size: 0.9em;">${postData.time || 'Just now'}</span>
        </div>
        <p>${postData.content}</p>
        <div class="interaction-buttons">
            <button onclick="likePost(this)">👍 Like</button>
            <button onclick="commentPost(this)">💬 Comment</button>
            <button onclick="sharePost(this)">🔄 Share</button>
        </div>
        <div class="comments-section"></div>
    `;
    
    postDiv.innerHTML = content;
    return postDiv;
}

// Function to upload an image
function uploadImage() {
    event.preventDefault();
    
    const imageInput = document.getElementById('imageUpload');
    const caption = document.getElementById('caption').value;
    
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const postData = {
                type: 'image',
                imageUrl: e.target.result,
                content: caption,
                author: 'You',
                time: 'Just now'
            };
            
            const newPost = createPostElement(postData);
            document.getElementById('posts').prepend(newPost);
            
            // Show success message
            showSuccessMessage('Photo uploaded successfully! 📸');
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
    
    // Reset form
    document.getElementById('upload-form').reset();
    return false;
}

// Function to create a blog post
function createBlog() {
    event.preventDefault();
    
    const blogContent = document.getElementById('blogContent').value;

    const postData = {
        type: 'blog',
        content: blogContent,
        author: 'You',
        time: 'Just now'
    };
    
    const newBlogPost = createPostElement(postData);
    document.getElementById('posts').prepend(newBlogPost);
    
    // Show success message
    showSuccessMessage('Blog posted successfully! ✍️');
    
    // Reset form
    document.getElementById('blog-form').reset();
    return false;
}

// Function to like a post
function likePost(button) {
    if (button.textContent.includes('Liked')) {
        button.textContent = '👍 Like';
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
        button.textContent = '❤️ Liked';
        button.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    }
}

// Function to comment on a post
function commentPost(button) {
    const comment = prompt('Enter your comment:');
    if (comment && comment.trim()) {
        const commentSection = button.parentElement.nextElementSibling;
        const newComment = document.createElement('p');
        newComment.innerHTML = `<strong>You:</strong> ${comment}`;
        commentSection.appendChild(newComment);
        
        showSuccessMessage('Comment added! 💬');
    }
}

// Function to share a post
function sharePost(button) {
    button.textContent = '✅ Shared';
    button.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    showSuccessMessage('Post shared with your network! 🔄');
    
    setTimeout(() => {
        button.textContent = '🔄 Share';
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 2000);
}

// Function to show success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);