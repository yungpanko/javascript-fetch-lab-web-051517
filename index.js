function getIssues(url) {
  fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `token ${getToken()}`
      }
    })
    .then(res => res.json())
    .then(json => {
      json.forEach(issue => {
        $('#issues').append(`<p>${issue.title} - ${issue.body}</p>`)
      })
    })
    .catch(error => console.log(error))

}

function showIssues(json) {
  let repoUrl = json.repository_url + '/issues'
  getIssues(repoUrl)
}

function createIssue() {
  let title = $('#title').val()
  let body = $('#body').val()
  let pathname = $('#forked')[0].pathname
  let url = 'https://api.github.com/repos' + pathname + '/issues'
  let data = {
    "title": title,
    "body": body
  }
  fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `token ${getToken()}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => showIssues(json))
    .catch(error => console.log(error))


}

function showResults(json) {}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  //use fetch to fork it!

  fetch('https://api.github.com/repos/' + repo + '/forks', {
      method: 'POST',
      headers: {
        Authorization: `token ${getToken()}`
      }
    })
    .then(res => res.json())
    .then(json => showForkedRepo(json))
    .catch(error => console.log(error))

}

function showForkedRepo(json) {
  let target = $('#results')
  target.append(`<a href=${json.html_url} id="forked">${json.html_url}</a>`)
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  const token = ''
  return token
}
