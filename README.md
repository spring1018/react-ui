## Setup

```
pnpm install
```

## GitHub Packages

### ライブラリの更新
`package.json` の `version` を更新

```json
{
  "name": "@spring1018/react-ui",
  "version": "x.x.x",
...
}
```

`npm publish` を実行

### ライブラリのインポート (更新)

`package.json` に `add` コマンドを追加しているので、以下を実行できる。

```sh
npx -p @spring1018/react-ui@x.x.x add
```

これを実行すると、`components` 以下にコンポーネントが追加される。
