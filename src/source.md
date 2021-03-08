# markdown-presentation

- https://github.com/tototoshi/markdown-presentation
- Markdownからのスライド生成ツール
- こういうの自作するのもう何回目かわからない
- j/kで前後,Home/Endで最初と最後に移動します。

## 要件

- webpack-dev-serverのlive reloadで快適に編集したい
- ブラウザの `⌘-p` で良い感じにPDFにしたい
- 静的HTMLをアップロードして公開できるようにしたい
- アニメーションとかはしなくて良い
  - できるけどPDF化とかと相性が悪い


- シンタックスハイライトくらいはしたい

  ```javascript
  window.onload = function() {
    console.log("Hello");
  }
  ```

## 実装

- 特に面白いところはなし

## 使い方

- `src/source.md` を編集する
- `assets/` に画像とかを置く
- Makefile置いてるので `make serve` 打つとwebpack-dev-serverが起動する
