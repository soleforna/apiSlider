/* defino la URL de la API a consultar */
const URL = 'http://mdqracing.com/mdqfiles2/app/get_last_services';

/* Obtengo los elementos del DOM a modificar */
const carouselInner = document.querySelector('.carousel-inner');
const carouselIndicators = document.querySelector('.carousel-indicators');

/* Realizo la llamada a la API que me devuelve una promesa que representa la respuesta HTTP de la API */
fetch(URL)

  /* Convierto la respuesta en formato JSON */
  .then(response => response.json())
  /* Accedo a los datos */
  .then(data => {
    const datos = data.data;
    
    /* Itero sobre los datos que es un array de objetos */
    datos.forEach((service, index) => {
      console.log(service)
      const newCarouselItem = document.createElement('div');
      newCarouselItem.classList.add('carousel-item');
      if (index === 0) {
        newCarouselItem.classList.add('active');
      }

      const newImage = document.createElement('img');
      newImage.src = service.vehicle_photo;
      newImage.classList.add('d-block');

      const newCarouselCaption = document.createElement('div');
      newCarouselCaption.classList.add('carousel-caption');

      const newTitle = document.createElement('h5');
      newTitle.textContent = service.vehicle_brand;

      const newDescription = document.createElement('p');
      newDescription.textContent = service.vehicle_type;

      newCarouselCaption.appendChild(newTitle);
      newCarouselCaption.appendChild(newDescription);

      newCarouselItem.appendChild(newImage);
      newCarouselItem.appendChild(newCarouselCaption);

      carouselInner.appendChild(newCarouselItem);

      // Crear indicador
      const newIndicator = document.createElement('button');
      newIndicator.type = 'button';
      newIndicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
      newIndicator.setAttribute('data-bs-slide-to', index.toString());
      if (index === 0) {
        newIndicator.classList.add('active');
        newIndicator.setAttribute('aria-current', 'true');
      }
      newIndicator.setAttribute('aria-label', `Slide ${index + 1}`);

      carouselIndicators.appendChild(newIndicator);
    });
  })
  /* En el caso que la respuesta de la API resulte un error se captura y se muestra por consola */
  .catch(error => {
    console.log("Error", error);
  });
