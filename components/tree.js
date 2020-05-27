export default function (data) {
    // Pegando o id 'tree' da HTML
    // Pega a tag principal que irá receber o menu
    const tree = document.querySelector('nav#tree');

    // Criando o 'menu' para fazer a 'tree'
    // Recebe toda a árvore de elementos 
    const menu = document.createElement('ul');

    // Pegando os elementos 'pais'(parent: null) do main.js
    // Filtra e verifica se o item não tem um parent
    const firstLevel = data.filter(item => !item.parent);

    // Adicionando o elemento ao 'li'
    // Primeiro nível de elementos
    // Mapeia o retorno de 'li's' e retorna ul arrary de 'li's'
    const getFirstLis = firstLevel.map(buildTree);
    // Adicionar 'li's' ao menu
    getFirstLis.forEach(li => menu.append(li));

    // Função resposável por criar a 'tree'
    function buildTree(item) {
        // Criando o 'li' para o 'menu'
        // Primeiro elemento
        const li = document.createElement('li');
        li.innerHTML = item.name;

        // Próximos níveis de elemento
        // Verifica algum elemento tem a ver com o elemento 'pai'
        // Se tiver ele será adicionado ao array
        const children = data.filter(child => child.parent === item.id)

        // Verificando se o elemento tem 'filhos'
        // Só cria o subMenu se o elemento tiver 'filhos'
        if (children.length > 0) {
            // Adiciona um click para os elementos 'pais'
            // Mostrar e não mostrar os 'filhos'
            li.addEventListener('click', event => {
                // Verifica o contexto apenas do elemento clicado
                event.stopPropagation();
                // Mostra ou esconde os filhos
                event.target.classList.toggle('open');
            });

            // Adiciona uma classe identificadora que de que tem filhos
            li.classList.add('has-children');

            // Criando o subMenu com os filhos
            const subMenu = document.createElement('ul');

            // Criando uma estrutura de dados para cada 'filho'
            // A função buildTree() chama a sí mesmo várias vezes
            children.map(buildTree)
                .forEach(li => subMenu.append(li));

            // Adicionando o subMenu dentro do 'li' que possui 'filhos'
            li.append(subMenu);

        }

        // Retornando o builTree
        return li;
    }

    // Adicionando o menu no HTML
    tree.append(menu);
}