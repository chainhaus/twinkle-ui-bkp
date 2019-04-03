let getBtn = document.getElementById('getTable');
let root = document.getElementById('root');
let root2 = document.getElementById('root2');

function makeSecondTable(arg) {
    let data = null;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", `http://localhost:3000/getref2?key=${arg}`);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
    xhr.onload = () => {

        let ref2 = JSON.parse(xhr.responseText);
        console.log(ref2);
        let html = `<tr><td>KEY</td><td>latitude</td><td>longitude</td></tr>`;
        for (let prop in ref2) {
            html += `<tr><td>${prop}</td><td>${ref2[prop].latitude}</td><td>${ref2[prop].longitude}</td></tr>`
        }
        root2.innerHTML = html;
    }
}

getBtn.addEventListener('click', () => {
    let data = null;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/getref");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    xhr.onload = () => {
        let ref = JSON.parse(xhr.responseText);
        console.log(ref);
        let html = `<tr>
            <td>KEY</td><td>DATA</td><td>epochSecond</td><td>nano</td><td>OWNER</td><td>TYPE</td>
          </tr>`;
        for (let prop in ref) {
            html += `<tr onclick="makeSecondTable('${prop}')">
              <td>${prop}</td><td>${ref[prop].data}</td><td>${new Date(ref[prop].dts.epochSecond * 1000)}</td>
              <td>${ref[prop].dts.nano}</td><td>${ref[prop].owner}</td><td>${ref[prop].type}</td>
            </tr>`;
        }
        root.innerHTML = html;
    }
}
);


