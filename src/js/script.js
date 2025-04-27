const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.getElementById('submit-btn').addEventListener('click', async () => {
    const email = document.getElementById('email-input').value;
    const message = document.getElementById('text-input').value;
  
    if (!email || !message) {
      alert('Please fill out both fields!');
      return;
    }
  
    try {
      const response = await fetch('https://uno-card-website.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Feedback sent successfully!');
        document.getElementById('email-input').value = '';
        document.getElementById('text-input').value = '';
      } else {
        alert('Error sending feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try later.');
    }
  });
  