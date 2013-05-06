{%=shortName%}
=======================

**{%=description%}**

- - -

概要
----

* 発表内容を Markdown で書くと、reveal.js を使ってスライドが出来上がるという仕組みを考えた。

* これをみんなで使い合って、かつそれらを Github で管理する


- - -


利点と目標
----------

- - -

### 書く人には…

* Markdown で内容を書くことに注力できること。
* プラットフォームに依存しない。

* （スライドのパターン化で少し楽出来るかも）


- - -

### 読む人には…

* reveal.js によって見栄えがある程度よいスライドが見れる。

* 事前に告知されたスライド URL を使って手元での閲覧を可能に

* スライドのパターンが統一されていることによる安心

- - -

### 管理と運用

* github で運用出来ること。

* Pull Request 受付けによる発展

* Markdown なので Diff を見るのも容易

* 後日スタイル（見栄え）を更新するなんてことも

* **資料は「教育のために再利用可能」にする**

- - -


懸念点
-------

* (ゲストは除いて) 基本的にみんなで足並みを揃える必要がある。みんな納得してこれを使うか？

* まめな管理と運用がちゃんとできるか。

* 最初から少し CSS をいじる必要がありそう。（既にみづらい）

* Markdown + reveal.js によるスライド表現から外れることができない。

* reveal.js が npm 配布されてないから少し手間。git submodule で様子見中。


- - -


資料の作成と利用の流れ
----------

* * *


### 資料の作成

- README.md で資料を書く
- index.html を用意 (reveal.js + README.md の設定。これは固定化可能)

* * *

### このシステムのための package.json があって

    $ npm install

* * *

### HTTP サーバを立てて資料がみれる

    $ npm start

* * *

### Markdown プレビューもできる

    $ ./node_modules/.bin/markup README.md

Jxck さんの markup を使ってる

[http://d.hatena.ne.jp/Jxck/20120825/1345887758](http://d.hatena.ne.jp/Jxck/20120825/1345887758)

- - -


Github での管理
---------------

- - -

### ともかく嬉しい点

Markdown で書いた発表資料の内容が Github でそのままドキュメントとして読めるところ。

reveal.js のようなスライドではない、簡易に書式化されたドキュメントで簡単に見れるのは楽でよい。


- - -


### Github Organizations を使う

* この仕組みで作った資料を個々のリポジトリへ。扱う内容毎に分ける。

* Pull Request を受け付けて内容を洗練させる（多分殆どないとは思う）。

* この Organizations 内ドキュメントは再利用可能にする。

* 最終的には、Node に関する日本語の勉強資料がここに集まってくれると嬉しい（東京とかも）。


- - -

難しくするつもりはなし
---------------------

元々のきっかけは「良い題材ならば定期的に同じ内容でやってもいいよね」という先日の話を受けて。

一度資料が出来上がっているのであれば、それを使って（誰でも）繰り返しできる環境であればよいと思った。

* * *

誰でも、プラットフォームに依存することなく、内容の追加や変更もシンプルにできるという環境

* テキストベースで資料が書けるように、Markdown。
* Markdown をそのままスライドにできるのが reveal.js。
* Github で公開する。Markdown との親和性も高い。

* * *

仕組みは簡単でも、運用に難ありならまた考えましょう。