# dicio

> Dicionário de português via linha de comando.

**Obs.:** É necessário estar conectado à internet.

Todos os dados apresentados são extraídos do site [dicio.com.br](https://dicio.com.br).

Essa ferramenta não é oficial do site!

## Instalação

Instale-o como quiser, pode ser como `npm` ou `yarn`:

Veja os comandos:

- npm: `npm install --global dicio`
- yarn: `yarn global add dicio`

## Uso

Depois da instalação você vai ter o comando `dicio` disponível.

Ele recebe apenas um argumento: uma palavra qualquer - da língua portuguesa.

Exemplo básico:

```
$ dicio café
café: s.m. Fruto do cafeeiro. / Estabelecimento onde se serve café e outras bebidas; botequim.
```

Observe que o uso de acentos não obrigatório, pois eles serão removidos durante
o processamento.

Isso significa que *café* e *cafe* são as mesmas coisas.

## Contribuição

Os dados apresentados são extraídos diretamente do HTML do site, portanto, há
grandes possibilidades do site atualizar ou sair fora do ar e essa ferramente
não conseguir fazer a raspagem das informações. Logo, se você estiver obtendo
muitos erros verifique se o site está funcionando e abra uma *issue* aqui.

Sinta-se livre para corrigir qualquer coisa e mandar novas ideias.

## Licença

MIT &copy; Matheus Alves
