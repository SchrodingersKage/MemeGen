const form = document.querySelector('.input');
const container = document.querySelector('.content-container');
const title = document.querySelector('h1');

setInterval(function () {
    let randomR = Math.floor(Math.random() * 256);
    let randomG = Math.floor(Math.random() * 256);
    let randomB = Math.floor(Math.random() * 256);
    title.style.color = `rgb(${randomR}, ${randomG}, ${randomB})`
}, 10000)

form.addEventListener('submit', createMeme);
container.addEventListener('click', downloadCanvas);

function createMeme(eve) {
    eve.preventDefault();
    const newImg = document.createElement('img');
    const canvas = document.createElement('canvas');
    const imgContainer = document.createElement('section')
    imgContainer.classList.add('image');
    canvas.classList.add('content');
    const c = canvas.getContext('2d');
    const height = 450;
    
    newImg.src= form[0].value;
    newImg.onload = function () {
        const ratio = height / newImg.naturalHeight;
        newImg.height = height;
        newImg.width = ratio * newImg.naturalWidth;
    
        canvas.width = newImg.width;
        canvas.height = newImg.height;
        container.append(imgContainer);
        imgContainer.append(canvas)
        c.drawImage(newImg, 0, 0, canvas.width, canvas.height);
        
        c.strokeStyle = 'black';
        c.lineWidth = 4;
        c.fillStyle = 'white';
        c.textAlign = 'center';
        c.lineJoin = 'round';
        c.font = `30px sans-serif`;
        
        c.textBaseline = 'top';
        c.strokeText(form[1].value, canvas.width / 2, 10);
        c.fillText(form[1].value, canvas.width / 2, 10);
    
        c.textBaseline = 'bottom';
        c.strokeText(form[2].value, canvas.width / 2, height - 10);
        c.fillText(form[2].value, canvas.width / 2, height - 10);
        for (let i = 0; i < form.length; i++) {
            form[i].value = '';
        }
    }
    newImg.onerror = function () {
        for (let i = 0; i < form.length; i++) {
            form[i].value = '';
        }
        alert('The image you have put in is invalid. Please check the url and try it again.');
    }
    createCover(imgContainer);
}

function createCover (parent) {
    // create container, and boxes
    const newDiv = document.createElement('div');
    const deleteButton = document.createElement('button');
    const downButton = document.createElement('button');
    // modify attributes
    deleteButton.innerText = 'Delete';
    downButton.innerText = 'Download';
    deleteButton.classList.add('box');
    downButton.classList.add('box');
    newDiv.classList.add('cover');
    // append elements
    newDiv.append(downButton);
    newDiv.append(deleteButton);
    parent.append(newDiv);
}

function downloadCanvas(eve) {
    let target = eve.target
    let holder;
    const containerArr = document.querySelectorAll('.image');
    for (let i = 0; i < containerArr.length; i++) {
        if (containerArr[i].contains(target)) {
            holder = containerArr[i]
        }
    }
    if (target.innerText === 'Download') {
        image = holder.querySelector('canvas');
        image = image.toDataURL();
        let tmpLink = document.createElement('a');  
        tmpLink.download = 'meme.png';
        tmpLink.href = image;
    
        document.body.appendChild(tmpLink);  
        tmpLink.click();  
        document.body.removeChild(tmpLink); 
    } else if (target.innerText === 'Delete') {
        holder.remove();
    }
}