document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-button');
    const characterList = document.getElementById('character-list');

    // Inicializa o número da página
    let page = 1;

    fetchButton.addEventListener('click', () => {
        fetchCharacters(page);
        page++;
    });

    async function fetchCharacters(page) {
        try {
            // Limpa a lista de personagens antes de adicionar novos
            characterList.innerHTML = '';

            // Solicita a lista de personagens da API com a página especificada
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();

            // Verifica se há personagens na página
            if (data.results.length === 0) {
                fetchButton.disabled = true; // Desabilita o botão se não houver mais personagens
                alert('No more characters to load.');
                return;
            }

            // Itera sobre cada personagem e cria um cartão para ele
            data.results.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.classList.add('character-card');

                characterCard.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <h3>${character.name}</h3>
                    <p><strong>Status:</strong> ${character.status}</p>
                    <p><strong>Species:</strong> ${character.species}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                `;

                characterList.appendChild(characterCard);
            });
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
        }
    }
});
