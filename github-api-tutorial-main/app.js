const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    let usernameInput = document.getElementById('usernameInput');
    let repoInput = document.getElementById('repoInput');

    let gitHubUsername = usernameInput.value.trim();
    let repositoryName = repoInput.value.trim();

    let ul = document.getElementById('userRepos');
    ul.innerHTML = "";

    requestRepoCommits(gitHubUsername, repositoryName)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found" || data.length === 0) {
                let li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `<p><strong>Repositório ou usuário não encontrado:</strong> ${gitHubUsername}/${repositoryName}</p>`;
                ul.appendChild(li);
            } else {
                data.forEach(commit => {
                    let li = document.createElement('li');
                    li.classList.add('list-group-item');
                    li.innerHTML = `
                        <p><strong>Mensagem:</strong> ${commit.commit.message}</p>
                        <p><strong>Data:</strong> ${new Date(commit.commit.author.date).toLocaleString()}</p>
                    `;
                    ul.appendChild(li);
                });
            }
        })
        .catch(error => {
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `<p><strong>Erro:</strong> ${error.message}</p>`;
            ul.appendChild(li);
        });
});

function requestRepoCommits(username, repo) {
    return fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
}
