document.addEventListener('DOMContentLoaded', () => {
    
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccessMessage = document.getElementById('form-success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            clearError(nameInput);
            clearError(emailInput);
            clearError(messageInput);
            formSuccessMessage.style.display = 'none';

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required.');
                isValid = false;
            }

            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required.');
                isValid = false;
            }

            if (isValid) {
                console.log('Form submitted successfully:');
                console.log('Name:', nameInput.value);
                console.log('Email:', emailInput.value);
                console.log('Subject:', document.getElementById('subject').value);
                console.log('Message:', messageInput.value);

                formSuccessMessage.style.display = 'block';
                contactForm.reset(); 

                setTimeout(() => {
                    formSuccessMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    function showError(inputElement, message) {
        inputElement.classList.add('invalid');
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        }
    }

    function clearError(inputElement) {
        inputElement.classList.remove('invalid');
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }

    function isValidEmail(email) {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    if (addTaskBtn && taskInput && taskList) {
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });

        taskList.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('task-text')) {
                target.parentElement.classList.toggle('completed');
            } else if (target.classList.contains('delete-task-btn')) {
                target.parentElement.remove();
            }
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const listItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.classList.add('task-text');
        taskSpan.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-task-btn');
        deleteBtn.textContent = 'Delete';

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);

        taskInput.value = ''; 
        taskInput.focus();
    }

    const imageUrlInput = document.getElementById('imageUrlInput');
    const imageAltInput = document.getElementById('imageAltInput');
    const addImageBtn = document.getElementById('addImageBtn');
    const imageGalleryContainer = document.getElementById('imageGalleryContainer');

    if (addImageBtn && imageUrlInput && imageAltInput && imageGalleryContainer) {
        addImageBtn.addEventListener('click', addImageToGallery);

        imageGalleryContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-image-btn')) {
                event.target.closest('.gallery-item').remove();
            }
        });
    }

    function addImageToGallery() {
        const imageUrl = imageUrlInput.value.trim();
        const altText = imageAltInput.value.trim();

        if (imageUrl === '') {
            alert('Please enter an image URL.');
            imageUrlInput.focus();
            return;
        }
        if (altText === '') {
            
            alert('Please enter an image description (alt text).');
            imageAltInput.focus();
            return;
        }


        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = altText;
        
        img.onerror = function() {
            
            console.warn(`Failed to load image: ${imageUrl}`);
            
        };


        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-image-btn');
        deleteBtn.innerHTML = '×'; 

        galleryItem.appendChild(img);
        galleryItem.appendChild(deleteBtn);
        imageGalleryContainer.appendChild(galleryItem);


        imageUrlInput.value = '';
        imageAltInput.value = '';
        imageUrlInput.focus();
    }
});