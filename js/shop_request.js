/*
    Purpose:    Retrieves data via POST request from the JSON server
                and generates a container card accordingly,
                which represents the retrieved data.

    Author:     Kraus David
    Date:       May 19, 2019
 */

//Get the root element (container) in which the cards should be placed
const shopContainer = document.getElementById('shop-content');

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/shop', true);
request.onload = function () {

    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(entry => {
            const card = document.createElement('div');
            card.setAttribute('class', 'col-sm-6 col-lg-4 mb-4');
            card.setAttribute('data-aos', "fade-up");

            const container = document.createElement('div');
            container.setAttribute('class', 'block-4 text-center border');
            const figure = document.createElement('figure');
            figure.setAttribute('class', 'block-4-image');
            const imageLink = document.createElement('a');
            imageLink.setAttribute('href', 'shop-single.html');

            const image = document.createElement('img');
            image.setAttribute('alt', 'Image Placeholder');
            image.setAttribute('class', "img-fluid");
            image.setAttribute('src', entry.imagePath);

            imageLink.appendChild(image);
            figure.appendChild(imageLink);
            container.appendChild(figure);

            const textContainer = document.createElement('div');
            textContainer.setAttribute('class', 'block-4-text p-4');
            const h3 = document.createElement('h3');
            const textLink = document.createElement('a');
            textLink.setAttribute('href', 'shop-single.html');
            textLink.textContent = entry.title;
            h3.appendChild(textLink);
            textContainer.appendChild(h3);

            const subTitle = document.createElement('p');
            subTitle.setAttribute('class', 'mb-0');
            subTitle.textContent = entry.subTitle;
            textContainer.appendChild(subTitle);

            const price = document.createElement('p');
            price.setAttribute('class', 'text-primary font-weight-bold');
            price.textContent = entry.price;
            textContainer.appendChild(price);

            container.appendChild(textContainer);
            card.appendChild(container);
            shopContainer.appendChild(card);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Could not connect to JSON-Server! Code: ` + request.status;
        app.appendChild(errorMessage);
    }
};

request.send();
