const d = document;
const $table = d.querySelector("crud-table");
const $form = d.querySelector("crud-form");
const $title = d.querySelector("crud-title");
const $template = d.getElementById("crud-template").content;
const $fragment = d.createDocumentFragment();

const ajax = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", e => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            // Converte a resposta da solicitação para texto
            let json = JSON.parse(xhr.responseText);
            // Success responsável por chamar o DOM e exibir no HTML a resposta
            success(json);
        }
        else {
            let message = xhr.statusText || "Ocurrió un error";
            // Error responsável por chamar o DOM e exibir no HTML o erro
            error(`Error ${xhr.status} ${message}`);
        }
    })

    // Especifica o Método e o endereço de onde buscar
    xhr.open(method || "GET", url);                             
        
    // Especifica como o conteúdo será solicitado
    xhr.setRequestHeader("Content-type", "application/json; charset=utf8")         
    
    // Conversão de JSON para string
    xhr.send(JSON.stringify(data));
}

const getAll = () => {
    ajax({
        url: "http://localhost:3000/santos",
        success: (res) => {console.log(res)},
        error: (err) => {console.error(err)}
    })
}

d.addEventListener("DOMContentLoaded", getAll)