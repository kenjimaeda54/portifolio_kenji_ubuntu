# Kenji Maeda — Portfolio

Portfolio interativo com interface inspirada no Ubuntu, desenvolvido para apresentar projetos, habilidades e experiências como Engenheiro de Software Mobile.

## Tecnologias

- **React 19** + **TypeScript** + **Vite 8**
- **Three.js** / **React Three Fiber** — background 3D interativo
- **Lucide React** — iconografia
- CSS-in-JS via estilos inline

## Como executar

```bash
# Clone o repositório
git clone https://github.com/kenjimaeda54/portifolio_kenji_ubuntu.git

# Acesse a pasta
cd portifolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

## Build para produção

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist/`.

## Funcionalidades

- Interface desktop simulada com ícones, janelas e dock
- Background 3D com partículas animadas
- Seções: Perfil, Habilidades, Recomendações, Projetos, Serviços, Contato, Fotos, Artigos
- Visualizador de fotos e vídeos com janelas modais
- Barra de ferramentas com relógio, data e informações do sistema
- Responsivo — recomenda visualização em tablet ou desktop (largura mínima de 900px)

## Licença

MIT