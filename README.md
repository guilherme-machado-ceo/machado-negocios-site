# Machado Negócios & Cia - Website

Site corporativo da Machado Negócios & Cia, uma empresa de consultoria empresarial especializada em soluções inovadoras para negócios.

## 🚀 Características

- **Design Moderno**: Interface profissional com paleta de cores preta, prata metálica, vermelha e amarela neon
- **Responsivo**: Totalmente adaptado para desktop, tablet e mobile
- **Multilíngue**: Suporte para Português, Inglês e Espanhol
- **Efeitos Visuais**: Animações LED, spots de luz e efeitos de brilho
- **Performance Otimizada**: Código limpo e otimizado para carregamento rápido

## 📁 Estrutura do Projeto

```
├── index.html              # Página principal
├── quemsomos.html          # Página Quem Somos
├── servicos.html           # Página de Serviços
├── entreemcontato.html     # Página de Contato
├── style.css               # Estilos principais
├── script.js               # JavaScript e efeitos visuais
├── staticwebapp.config.json # Configuração Azure Static Web Apps
├── .github/workflows/      # GitHub Actions para CI/CD
└── images/                 # Imagens e recursos
```

## 🌐 Deploy Automático no Azure

### Pré-requisitos

1. Conta no [Azure](https://azure.microsoft.com/)
2. Conta no [GitHub](https://github.com/)
3. Repositório GitHub com o código do site

### Passo a Passo para Deploy

#### 1. Criar Azure Static Web App

1. Acesse o [Portal do Azure](https://portal.azure.com/)
2. Clique em "Criar um recurso"
3. Procure por "Static Web App" e selecione
4. Preencha as informações:
   - **Subscription**: Sua assinatura Azure
   - **Resource Group**: Crie um novo ou use existente
   - **Name**: `machado-negocios-site`
   - **Plan type**: Free (para começar)
   - **Region**: East US 2 (recomendado)

#### 2. Configurar GitHub Integration

1. Na seção "Deployment details":
   - **Source**: GitHub
   - **GitHub account**: Sua conta GitHub
   - **Organization**: Sua organização
   - **Repository**: Selecione o repositório do site
   - **Branch**: main ou master

2. Na seção "Build Details":
   - **Build Presets**: Custom
   - **App location**: `/`
   - **Api location**: (deixe vazio)
   - **Output location**: `/`

3. Clique em "Review + create" e depois "Create"

#### 3. Configuração Automática

O Azure automaticamente:
- Criará um workflow do GitHub Actions no seu repositório
- Configurará os secrets necessários
- Fará o primeiro deploy

#### 4. Verificar Deploy

1. Vá para o recurso criado no Azure
2. Clique em "Browse" para ver o site
3. A URL será algo como: `https://[nome-do-app].azurestaticapps.net`

### 🔄 Deploy Contínuo

Após a configuração inicial, qualquer push para a branch principal ativará automaticamente:
- Build do projeto
- Deploy para o Azure
- Atualização do site em produção

### 🛠️ Configurações Avançadas

#### Custom Domain

1. No Azure Portal, vá para sua Static Web App
2. Clique em "Custom domains"
3. Adicione seu domínio personalizado
4. Configure os registros DNS conforme instruído

#### Environment Variables

1. No Azure Portal, vá para "Configuration"
2. Adicione variáveis de ambiente se necessário
3. Redeploy para aplicar as mudanças

### 📊 Monitoramento

- **Application Insights**: Habilitado automaticamente
- **Logs**: Disponíveis na seção "Log stream"
- **Metrics**: Métricas de performance e uso

### 🔧 Troubleshooting

#### Build Falha
- Verifique os logs no GitHub Actions
- Confirme que todos os arquivos estão no repositório
- Verifique se não há erros de sintaxe no código

#### Site não Carrega
- Verifique se o deploy foi concluído
- Confirme as configurações de rota no `staticwebapp.config.json`
- Verifique os logs do Azure

### 📞 Suporte

Para suporte técnico:
- **GitHub Issues**: Para problemas de código
- **Azure Support**: Para problemas de infraestrutura
- **Documentação**: [Azure Static Web Apps Docs](https://docs.microsoft.com/en-us/azure/static-web-apps/)

### 📝 Licença

© 2025 Machado Negócios & Cia. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para Machado Negócios & Cia**