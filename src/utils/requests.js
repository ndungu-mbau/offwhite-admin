let API;

if (window.location.href.includes('localhost')) {
  API = `http://localhost:4000`
  // API = `https://mis-graph-staging.herokuapp.com`
} else {
  API = `http://localhost:4000`
  // API = `https://mis-graph-staging.herokuapp.com`
}

export {
  API
}