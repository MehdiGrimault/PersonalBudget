let response = await fetch('http://localhost:5500/envelopes');
let data = await response.json();
let envelopes = data.envelopes;
console.log(envelopes);

document.body.onload = await displayEnvelopes();

async function displayEnvelopes() {
    // get the reference for the body
    let body = document.getElementsByTagName("body")[0];
  
    // creates a list of element 
    let list = document.createElement("ul");
    for (const envelope of envelopes) {
        let li = document.createElement("li");
        let text = document.createTextNode(envelope.title);
        li.appendChild(text);
        list.appendChild(li);
    }
    body.appendChild(list);
  }