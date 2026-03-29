# PDFy - Toolkit Profissional de PDF

> Uma aplicacao web completa para manipulacao, conversao e criacao de curriculos em PDF.
> Construida com React + Vite, com design moderno de SaaS.

---

## Registro de Desenvolvimento

### Dia 1: Inicio do Projeto

**Pedido Inicial:** Criar um site para construir curriculos.

Iniciei o projeto com React e Vite. O escopo inicial era simples - um criador de curriculos com funcionalidades basicas.

```bash
npm create vite@latest resume-builder -- --template react
cd resume-builder
npm install
```

**Funcionalidades Iniciais:**
- Criacao de curriculo com preview em tempo real
- Funcionalidade de exportacao para PDF
- Templates simples e profissionais

---

### Dia 2: Expansao de Funcionalidades

**Pedido:** Adicionar ferramentas de PDF abrangentes alem de curriculos.

Expandi a aplicacao para se tornar um toolkit completo de PDF. Adicionei varias novas funcionalidades:

#### Novos Modulos Adicionados:
1. **Construtor de Curriculos** (2 templates)
   - Curriculo simples - limpo e minimalista
   - Curriculo profissional - detalhado e elegante

2. **Ferramentas de Conversao de PDF**
   - Converter PARA PDF: Word → PDF, Excel → PDF, PowerPoint → PDF, JPG → PDF
   - Converter DE PDF: PDF → Word, PDF → Excel, PDF → PowerPoint, PDF → JPG

3. **Edicao de PDF**
   - Adicionar texto a PDFs
   - Inserir imagens
   - Criar anotacoes
   - Adicionar marcas d'agua
   - Numeracao de paginas

4. **Seguranca de PDF**
   - Protecao por senha
   - Remocao de senha
   - Redacao de dados sensiveis

5. **Assinatura Digital**
   - Assinar documentos online
   - Solicitar assinaturas de outros
   - Suporte para contratos e documentos oficiais

6. **OCR (Reconhecimento Optico de Caracteres)**
   - Transformar PDFs escaneados em texto editavel
   - Conversao de imagem para texto

7. **Ferramentas Adicionais**
   - Girar PDF
   - Reparar PDFs corrompidos
   - Comparar PDFs
   - Conversao de HTML para PDF
   - Digitalizacao de documentos por celular

**Decisoes de Tech Stack:**
- `react-router-dom` para navegacao
- `pdf-lib` para manipulacao de PDF
- `html2canvas` + `jsPDF` para geracao de PDF de curriculos

---

### Dia 3: Rebranding Visual

**Pedido:** Refatorar frontend com marca "PDFy" e design moderno de SaaS.

Reformula visual completa preservando todas as funcionalidades.

#### Mudancas Realizadas:

**Marca:**
- Nome da aplicacao alterado para "PDFy"
- Todos os textos visiveis atualizados
- Titulos de paginas e metadata atualizados

**Melhorias de UI:**
- Estilo moderno de SaaS
- Espacamento aumentado entre elementos
- Cantos arredondados (border-radius)
- Sombras suaves nos cards
- Tipografia melhorada

**Sistema de Cores:**
```css
Primaria:   #4F46E5 (Indigo)
Secundaria: #22C55E (Verde)
Fundo:      #F9FAFB (Cinza claro)
Texto:      #111827 (Cinza escuro)
```

**Atualizacoes de Componentes:**
- Navbar: Limpa e moderna
- Botoes: Efeitos hover, arredondados
- Formularios: Melhor espacamento e alinhamento
- Cards: Sombra e padding
- Tabelas: Layout limpo

**Design Responsivo:**
- Otimizado para mobile e desktop
- Layouts de grid flexiveis
- Navegacao amigavel para touch

---

### Dia 4: Implementacao de Tema Claro/Escuro

**Pedido:** Adicionar opcao de modo claro ou escuro.

Implementei um sistema de tema completo.

#### Implementacao Tecnica:

**1. Criado ThemeContext.jsx:**
```jsx
// React Context para estado global de tema
// Persistencia no localStorage
// Deteccao de preferencia do sistema
```

**2. Criado ThemeToggle.jsx:**
- Icones SVG de lua/sol
- Botao acessivel com aria-labels
- Transicoes suaves

**3. CSS atualizado com Propriedades Customizadas:**
```css
:root {
  /* Variaveis tema claro */
  --bg-primary: #F9FAFB;
  --text-primary: #111827;
  /* ... */
}

[data-theme="dark"] {
  /* Variaveis tema escuro */
  --bg-primary: #0F172A;
  --text-primary: #F8FAFC;
  /* ... */
}
```

**4. App envolvido com ThemeProvider**

**Funcionalidades:**
- Alternar entre modos claro/escuro
- Preferencia persistente (localStorage)
- Deteccao de preferencia do sistema
- Transicoes suaves entre temas

---

### Dia 5: Redesign Baseado no Logo

**Pedido:** Redesenhar interface inteira baseada no logo PDFy fornecido.

Extraido cores do logo e reconstruido o sistema de design.

#### Analise do Logo:
- **Vermelho:** #DC2626 (energia, acao)
- **Azul:** #1E40AF (confianca, profissionalismo)
- **Gradiente:** Vermelho → Azul

#### Novo Sistema de Design:

**Paleta de Cores Atualizada:**
```css
/* Cores da Marca */
--pdfy-red: #DC2626;
--pdfy-red-light: #FEE2E2;
--pdfy-red-dark: #991B1B;

--pdfy-blue: #1E40AF;
--pdfy-blue-light: #DBEAFE;
--pdfy-blue-dark: #1E3A8A;

/* Primaria: Azul para confianca */
--primary-500: #3B82F6;
--primary-600: #2563EB;
--primary-700: #1D4ED8;

/* Secundaria: Vermelho para acao */
--secondary-500: #EF4444;
--secondary-600: #DC2626;
--secondary-700: #B91C1C;
```

**Melhorias Visuais:**
- Estetica profissional de SaaS
- Sistema de espacamento consistente
- Cantos arredondados (10-20px)
- Sombras sutis com efeitos de brilho
- Tipografia moderna (fonte Inter)

**Componentes Redesenados:**
- Navegacao com logo
- Secao hero
- Cards de funcionalidades
- Grids de ferramentas
- Formularios e botoes
- Areas de upload

**Implementacao do Logo:**
- Componente de logo SVG com gradiente
- Variante de logo completo (icone + texto)
- Espacamento e proporcoes adequados
- Sombra para profundidade

---

### Dia 6: Refinamento do Logo

**Pedido:** Corrigir problemas de visibilidade e melhorar composicao do logo.

#### Problemas Corrigidos:

**1. Visibilidade:**
- Contraste aumentado
- Icone de documento mais nitido
- Melhor posicionamento do rotulo "PDF"

**2. Composicao:**
- ViewBox maior (48x48)
- Margens adequadas (padding de 2px)
- Elementos centralizados
- Espacamento balanceado

**3. Prominencia do Texto:**
- Texto "PDFy" maior (1.6rem)
- Efeito de texto gradiente
- Melhor espacamento entre letras

**4. Melhorias Tecnicas:**
```jsx
// Estrutura SVG refinada
<svg viewBox="0 0 48 48">
  {/* Fundo com sombra */}
  <rect with gradient />
  {/* Icone de documento */}
  <path documentBody />
  <path foldedCorner />
  {/* Rotulo PDF */}
  <rect labelBackground />
  <text PDF />
</svg>
```

---

## Sistema de Design Atual

### Cores
| Proposito | Cor | Hex |
|-----------|-----|-----|
| Primaria | Azul | #2563EB |
| Secundaria | Vermelho | #DC2626 |
| Fundo | Claro | #F8FAFC |
| Fundo Escuro | Escuro | #0B1120 |
| Texto | Primaria | #0F172A |
| Texto | Secundaria | #475569 |

### Tipografia
- **Fonte:** Inter, system-ui, sans-serif
- **Pesos:** 400, 500, 600, 700, 800
- **Tamanhos:** Escala responsiva

### Espacamento
- Unidade base: 4px
- Escala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Border Radius
- Pequeno: 6px
- Medio: 10px
- Grande: 14px
- XL: 20px
- Completo: 9999px

### Sombras
```css
--shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
--shadow-md: 0 4px 6px rgba(15, 23, 42, 0.08);
--shadow-lg: 0 10px 15px rgba(15, 23, 42, 0.08);
--shadow-glow: 0 0 20px rgba(37, 99, 235, 0.15);
```

---

## Tech Stack

| Categoria | Tecnologia |
|-----------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Roteamento | React Router v6 |
| Biblioteca PDF | pdf-lib |
| Geracao PDF | html2canvas + jsPDF |
| Estilizacao | CSS Custom Properties |
| Icones | SVG |
| Tema | React Context + localStorage |

---

## Estrutura do Projeto

```
resume-builder/
├── public/
├── src/
│   ├── components/
│   │   └── ThemeToggle.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ResumeSimple.jsx
│   │   ├── ResumeProfessional.jsx
│   │   ├── ConvertToPDF.jsx
│   │   ├── ConvertFromPDF.jsx
│   │   ├── EditPDF.jsx
│   │   ├── PDFSecurity.jsx
│   │   ├── DigitalSignature.jsx
│   │   ├── OCR.jsx
│   │   └── PDFOtherTools.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Como Comecar

### Pre-requisitos
- Node.js 18+
- npm ou yarn

### Instalacao

```bash
# Clonar o repositorio
git clone https://github.com/lucianodev2/PDFy.git
cd PDFy

# Instalar dependencias
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Build para Producao

```bash
npm run build
```

---

## Funcionalidades

### Construtor de Curriculos
- [x] Template simples
- [x] Template profissional
- [x] Preview em tempo real
- [x] Exportacao PDF

### Conversao de PDF
- [x] Word → PDF
- [x] Excel → PDF
- [x] PowerPoint → PDF
- [x] JPG → PDF
- [x] PDF → Word
- [x] PDF → Excel
- [x] PDF → PowerPoint
- [x] PDF → JPG

### Edicao de PDF
- [x] Adicionar texto
- [x] Inserir imagens
- [x] Anotacoes
- [x] Marcas d'agua
- [x] Numeracao de paginas

### Seguranca de PDF
- [x] Protecao por senha
- [x] Remocao de senha
- [x] Redacao de dados

### Assinatura Digital
- [x] Assinatura online
- [x] Solicitacao de assinaturas

### OCR
- [x] PDF escaneado para texto
- [x] Imagem para texto

### Outras Ferramentas
- [x] Girar PDF
- [x] Reparar PDF
- [x] Comparar PDFs
- [x] HTML para PDF

### UI/UX
- [x] Design moderno de SaaS
- [x] Layout responsivo
- [x] Tema claro/escuro
- [x] Marca profissional

---

## Notas de Desenvolvimento

### Desafios Superados

1. **Politica de Execucao do PowerShell**
   - Problema: Nao conseguia executar comandos npm diretamente
   - Solucao: Usei child_process do Node.js para contornar restricoes

2. **Resolucao de Import do Vite**
   - Problema: Problemas de timing com criacao rapida de arquivos
   - Solucao: Garanti que arquivos fossem totalmente escritos antes dos imports

3. **Geracao de PDF**
   - Problema: Renderizacao de layout complexo
   - Solucao: Combinei html2canvas para renderizacao + jsPDF para saida

4. **Implementacao de Tema**
   - Problema: Tema consistente entre componentes
   - Solucao: CSS Custom Properties com React Context

### Decisoes de Design

- **Apenas client-side:** Todo processamento acontece no navegador para privacidade
- **Sem backend:** Arquivos nunca saem do computador do usuario
- **Logos SVG:** Escalaveis e nitidos em qualquer tamanho
- **Variaveis CSS:** Facil alternancia de tema e manutencao

---

## Melhorias Futuras

Funcionalidades potenciais para desenvolvimento futuro:

- [ ] Integracao com armazenamento em nuvem
- [ ] Contas de usuario e documentos salvos
- [ ] Mais templates de curriculo
- [ ] Processamento em lote
- [ ] API para desenvolvedores
- [ ] Aplicativo mobile
- [ ] Sugestoes de curriculo com IA
- [ ] Criacao de formularios PDF
- [ ] Assinaturas eletronicas (juridicamente validas)

---

## Licenca

Licenca MIT - sinta-se livre para usar e modificar.

---

## Agradecimentos

Construido com:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [pdf-lib](https://pdf-lib.js.org)
- [html2canvas](https://html2canvas.hertzen.com)
- [jsPDF](https://parall.ax/products/jspdf)

---

**Desenvolvido por:** lucianodev2  
**Repositorio:** https://github.com/lucianodev2/PDFy
