# markdown-presentation

- https://github.com/tototoshi/markdown-presentation
- Markdown からのスライド生成ツール
- こういうの自作するのもう何回目かわからない
- j/k で前後,Home/End で最初と最後に移動します。

## 要件

- webpack-dev-server の live reload で快適に編集したい
- ブラウザの `⌘-p` で良い感じに PDF にしたい
- 静的 HTML をアップロードして公開できるようにしたい
- アニメーションとかはしなくて良い

  - できるけど PDF 化とかと相性が悪い

- シンタックスハイライトくらいはしたい

  ```javascript
  window.onload = function () {
    console.log("Hello");
  };
  ```

## 実装

- 特に面白いところはなし

## 使い方

- `src/source.md` を編集する
- Makefile 置いてるので `make serve` 打つと webpack-dev-server が起動する
