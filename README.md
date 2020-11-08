# 将棋

[React](https://ja.reactjs.org/) x [Redux](https://redux.js.org/)
で作った[将棋](https://en.wikipedia.org/wiki/Shogi)アプリ

動くものは[こちら](https://akhrszk.github.io/shogi-react-redux/)から確認できます

[![screenshot](https://github.com/akhrszk/shogi-react-redux/blob/images/screenshot.png)](https://akhrszk.github.io/shogi-react-redux/)

## 技術スタック

* [create-react-app](https://github.com/facebook/create-react-app)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [TypeScript](https://www.typescriptlang.org/)

## ディレクトリ構造

```
src
├── App.css
├── App.test.tsx
├── App.tsx
├── app
│   └── store.ts
├── core
│   └── game.ts
├── domain
│   ├── piece.ts
│   ├── player.ts
│   └── position.ts
├── factory
│   └── pieceFactory.ts
├── features
│   ├── board
│   │   ├── Board.module.css
│   │   └── Board.tsx
│   ├── game
│   │   ├── Game.module.css
│   │   ├── Game.tsx
│   │   └── gameSlice.ts
│   ├── name
│   │   ├── Name.module.css
│   │   └── Name.tsx
│   └── stock
│       ├── Stock.module.css
│       └── Stock.tsx
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── serviceWorker.ts
├── setupTests.ts
└── utils
    └── utils.ts
```

## 実行方法

```
$ git clone git@github.com:akhrszk/shogi-react-redux.git
$ cd shogi-react-redux
$ yarn start
```

## ライセンス

[MIT License](https://github.com/akhrszk/shogi-react-redux/blob/master/LICENSE)
