'use strict';

function resultsCode(name,html_url) {
  $('.repo-list').append(`
  <li>
    <h3>Name: ${name}</h3>
    <p>URL: ${html_url}</p>
  </li>
  `);
}

function results(responseJson, searchData) {
  $('.repo-list').empty(); //empty previous results
  $('#search').val(''); //empty search bar
  $('.username-repos').text(`${searchData}'s Repos`);
  for (let j = 0;j<responseJson.length;j++) {
    let name = responseJson[j]['name'];
    let url = responseJson[j]['html_url'];
    resultsCode(name,url);
  }
}
function listener() {
  $('#github-search').on('submit', e=> {
    e.preventDefault();
    let searchData = $('#search').val();
    let url = `https://api.github.com/users/${searchData}/repos`;
    console.log(url);
    fetch(url)
      .then(response => {
        if (response.ok) { return response.json(); }
        throw new Error(response.statusText);
      })
      .then(responseJson => results(responseJson,searchData))
      .catch(err => {
        $('.repo-list').empty();
        $('.username-repos').text(`${err} sorry`);
      });
  });
}

$(listener);