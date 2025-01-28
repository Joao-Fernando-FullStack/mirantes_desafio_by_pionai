
document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.querySelector('.btt');
    const postInput = document.getElementById('posting');
    const imageInput = document.getElementById('imageInput');
    const postsContainer = document.querySelector('.postsContainer');
    const selectImageIcon = document.getElementById('selectImage');
    const charCount = document.getElementById('charCount');
    const charLimit = 280;

    let selectedImage = null;

    // Abrir seletor de arquivos ao clicar no ícone
    selectImageIcon.addEventListener('click', () => {
        imageInput.click();
    });

    // Salvar a imagem selecionada
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                selectedImage = event.target.result; // Base64 da imagem
            };
            reader.readAsDataURL(file);
        }
    });

    // Atualizar a contagem de caracteres em tempo real
    postInput.addEventListener('input', () => {
        const currentLength = postInput.value.length;
        const remainingChars = charLimit+1 - currentLength;

        charCount.textContent = `${remainingChars}`;

        // Mudar a cor conforme o limite de caracteres é atingido
        if (remainingChars <= 20) {
            charCount.style.color = 'red';
        } else if (remainingChars <= 50) {
            charCount.style.color = 'orange';
        } else {
            charCount.style.color = 'gray';
        }

        // Impedir que o usuário digite além do limite
        if (currentLength >= charLimit) {
            postInput.value = postInput.value.slice(0, charLimit);
        }
    });

    // Função para adicionar posts ao feed


  // Salvar a imagem selecionada
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        selectedImage = event.target.result; // Base64 da imagem
      };
      reader.readAsDataURL(file);
    }
  
});
    // Adicionar nova publicação
    postButton.addEventListener('click', () => {
        const postContent = postInput.value.trim();

        // Verificar se há texto ou imagem para postar
        if (postContent || selectedImage) {
            if(postContent.length<281) {
                let newPost = `
            <div class="post posting flex py-2 px-2 cursor-pointer hover:bg-[#080808]">
                <div class="mr-2 my-2 w-14">
                    <img src="./assets/images/logo-pionai1.png" alt="" class="rounded-full size-8">
                </div>
                <div class="flex flex-col">
                    <div class="flex justify-between">
                        <div class="flex items-center">
                            <div>
                                <div class="flex gap-[2px]">
                                    <h1 class="font-bold hover:underline text-base w-fit">PionAI Startup</h1>
                                    <h2 class="text-base text-gray-400">@pionaistartup · Agora</h2>
                                </div>
                                <div>
                                    <h3 class="text-sm" style="word-break: break-word;">${postContent ? `${postContent}` : ''}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <i class="text-xl fa-solid fa-ellipsis hover:text-[#1d9bf0] mr-2 my-auto rounded-full"></i>
                        </div>
                    </div>
                    <div class="postimg">
                        <div class="image">
                        ${selectedImage ? `<img src="${selectedImage}" alt="Imagem da postagem" class="rounded-3xl my-2 w-[90%] h-[90%]">` : ''}
                        </div>
                        <div class="icons flex justify-between text-xs text-gray-400">
                            <div class="py-2 flex justify-between w-[88%]">
                                <div class="flex gap-1 hover:text-[#1d9bf0] items-center">
                                    <span class="material-symbols-outlined">chat_bubble</span>
                                </div>
                                <div class="flex gap-1 hover:text-[#00ba7c] items-center">
                                    <span class="material-symbols-outlined">repeat</span>
                                </div>
                                <div class="flex gap-2 items-center like">
                                    <span class="material-symbols-outlined cursor-pointer">favorite</span>
                                    <span class="like-count">0</span>
                                </div>
                                <div class="flex gap-1 hover:text-[#f9c542] items-center">
                                    <span class="material-symbols-outlined">bar_chart</span>
                                </div>
                            </div>
                            <div class="md:hidden py-2  ml-2 flex justify-end">
                                <span class="material-symbols-outlined hover:text-[#1d9bf0]">share</span>
                            </div>
                            <div class="hidden md:flex py-2 justify-end gap-1">
                                <span class="material-symbols-outlined hover:text-[#1d9bf0]">bookmark</span>
                                <span class="material-symbols-outlined hover:text-[#1d9bf0]">upload</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="border-gray-500">`;

            // Inserir a nova publicação no início do container
            postsContainer.insertAdjacentHTML('afterbegin', newPost);

            // Limpar o campo de entrada e imagem selecionada
            postInput.value = '';
            selectedImage = null;
            imageInput.value = '';
            charCount.textContent = `${charLimit}`;
            charCount.style.color = 'gray';
            }
            
        } else {
            alert('Por favor, digite algo ou selecione uma imagem para postar.');
        }
    });

    // Delegação de evento para curtir (adicionando interação ao botão de like)
    postsContainer.addEventListener('click', (event) => {
        const target = event.target;

        // Verificar se o clique foi no ícone de like
        if (target.closest('.like')) {
            const likeElement = target.closest('.like');
            const likeCount = likeElement.querySelector('.like-count');
            let count = parseInt(likeCount.textContent) || 0; // Obter a contagem de curtidas (inicialmente 0)

            // Verificar se o like já foi dado
            if (!likeElement.classList.contains('liked')) {
                // Adicionar like
                count += 1;
                likeElement.classList.add('liked'); // Marcar como curtido
                likeElement.style.color = '#f91880'; // Alterar cor para vermelho
            } else {
                // Remover like
                count -= 1;
                likeElement.classList.remove('liked'); // Remover o like
                likeElement.style.color = 'inherit'; // Restaurar cor original
            }

            // Atualizar a contagem de curtidas no contador
            likeCount.textContent = count;
        }
    });

    const addPostToFeed = (postContent, time, image) => {
        const post = document.createElement('div');
        post.className = 'posting'; // Inicialmente sem a classe fade-in
        post.innerHTML = `
          <div class="post posting flex py-2 px-2 cursor-pointer hover:bg-[#080808]">
            <div class="mr-2 my-2 w-14">
              <img src="./assets/images/logocode.jpg" alt="" class="rounded-full size-8">
            </div>
            <div class="flex flex-col">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div>
                    <div class="flex gap-[2px]">
                      <h1 class="font-bold hover:underline text-base w-fit">CODE POINT by Mirantes</h1>
                      <h2 class="text-base text-gray-400">@pionaistartup · ${time}</h2>
                    </div>
                    <div>
                      <h3 class="text-sm" style="word-break: break-word;">${postContent ? `${postContent}` : ''}</h3>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <i class="text-xl fa-solid fa-ellipsis hover:text-[#1d9bf0] mr-2 my-auto rounded-full"></i>
                </div>
              </div>
              <div class="postimg">
                <div class="image">
                  ${image ? `<img src="${image}" alt="Imagem da postagem" class="rounded-3xl my-2 w-[90%] h-[90%]">` : ''}
                </div>
                <div class="icons flex justify-between text-xs text-gray-400">
                  <div class="py-2 flex justify-between w-[88%]">
                    <div class="flex gap-1 hover:text-[#1d9bf0] items-center">
                      <span class="material-symbols-outlined">chat_bubble</span>
                    </div>
                    <div class="flex gap-1 hover:text-[#00ba7c] items-center">
                      <span class="material-symbols-outlined">repeat</span>
                    </div>
                    <div class="flex gap-2 items-center like">
                    <span class="material-symbols-outlined cursor-pointer">favorite</span>
                    <span class="like-count">0</span>
                </div>
                    <div class="flex gap-1 hover:text-[#f9c542] items-center">
                      <span class="material-symbols-outlined">bar_chart</span>
                    </div>
                  </div>
                  <div class="md:hidden py-2 ml-2 flex justify-end">
                    <span class="material-symbols-outlined hover:text-[#1d9bf0]">share</span>
                  </div>
                  <div class="hidden md:flex py-2 justify-end gap-1">
                    <span class="material-symbols-outlined hover:text-[#1d9bf0]">bookmark</span>
                    <span class="material-symbols-outlined hover:text-[#1d9bf0]">upload</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="border-gray-500">
        `;
      
        // Adiciona o post ao início do container
        postsContainer.insertAdjacentElement('afterbegin', post);
      
        // Adiciona a classe de fade-in com um pequeno atraso para acionar a animação
        requestAnimationFrame(() => {
          setTimeout(() => {
            post.classList.add('fade-in');
          }, 100); // Pode ajustar o valor do delay se necessário
        });
      };
  
      
      const simulatedPosts = [
        {
            text: 'Conheça a nossa classificação 🚀',
            image: './assets/images/posting1.jpg'
        },
        {
            text: 'Melhor concurso de programação de Angola!',
            image: './assets/images/posting.jpg'
        },
        {
            text: 'Já conheces a PIONAI?',
            image: './assets/images/team.jpg'
        }
    ];
    
    let count = 0; // Começa com o primeiro post do array
    let count1 = 4;
    const intervalId = setInterval(() => {
        if (count < simulatedPosts.length) { // Verifica se há posts restantes
            const post = simulatedPosts[count];
            count1=count1-1;
            addPostToFeed(post.text, `${count1} min atrás`, post.image); // Adiciona o post com tempo crescente
            count++; // Incrementa para o próximo post
        } else {
            clearInterval(intervalId); // Para o intervalo após exibir todos os posts
        }
    }, 4000); // Intervalo de 5 segundos
    
    
    
    
});



