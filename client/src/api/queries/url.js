let url;

if (process.env.NODE_ENV === 'production') {
  url = '/api';
} else {
  url = 'http://localhost:4000/api';
}

export default url;
