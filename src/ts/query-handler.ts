let currentURL: URL = new URL (window.location.href);

const setQueryParameters = function(parameter: string, value: string): void{
  let params = new URLSearchParams(currentURL.search);
  params.set(parameter, value);
} 


export { currentURL, setQueryParameters }