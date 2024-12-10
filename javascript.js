class PacoteBuscador {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const form = document.querySelector("form");
const titulo = document.querySelector("#titulo");
const conteudo = document.querySelector("#conteudo");
const renderizarTitulo = document.querySelector("#renderizar-titulo");
const renderizarConteudo = document.querySelector("#renderizar-conteudo");
const API = new PacoteBuscador("https://jsonplaceholder.typicode.com");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    API.post("/posts", {
        title: titulo.value,
        body: conteudo.value,
        userId: 1
    }).then(data => console.log(data));

    renderizarTitulo.innerHTML = titulo.value;
    renderizarConteudo.innerHTML = conteudo.value;
})