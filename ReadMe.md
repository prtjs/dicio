# dicio

> Dicionário de português via linha de comando.

Uma simples ferramenta de linha de comando para encontrar rapidamente o significado de qualquer palavra da língua portuguesa. Necessita estar conectado com a *internet*. Todas as informações de palavras retornadas por essa ferramenta são extraídas do *site* [dicionariodoaurelio.com](https://dicionariodoaurelio.com/).

```
 ____ ____ ____ ____ ____ 
||d |||i |||c |||i |||o ||
||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|
```

## Instalação

Via linha de comando faça:

```
$ npm install --global dicio
```

## Uso

```
$ dicio <palavra>
```

Onde `<palavra>` pode ser qualquer palavra da língua portuguesa. Não há diferenças entre uma palavra com caracteres acentuados e a mesma palavra sem nenhuma acentuação, por exemplo, `café` terá o mesmo resultado de `cafe`.

Veja um exemplo para ver os significados de *computador*:

```
$ dicio computador
1 O que faz cálculos (pessoa ou máquina).
2 Aparelho eletrônico usado para processar, guardar e tornar acessível informação de variados tipos.
3 O mesmo que computador pessoal.
4 computador pessoal: computador para uso individual, cuja construção se baseia num microprocessador.
```

## Licença

MIT &copy; [Matheus Alves](https://github.com/theuves)
