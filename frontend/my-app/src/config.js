// frontend/my-app/src/config.js
let apiUrl;

if (process.env.NODE_ENV === 'production') {
    apiUrl = "http://3.108.219.254";
} else {
    apiUrl = "http://localhost:5000";
}

export default apiUrl;