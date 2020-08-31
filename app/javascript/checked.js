//https://master.tech-camp.in/curriculums/4652

function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {

    if (post.getAttribute("data-load") != null){
      return null;
    }
    post.setAttribute("data-load", "true");    
    //7~10行目:すでに処理済みのイベントに対しては処理が実行されないように設定
    //1度処理をするものにはpost.setAttribute("data-load", "true");を実行し、data-loadという要素を追加しています。
    //2回目以降はdata-loadがnullではないもの、すなわち処理済みであるメモの場合には、処理を中断させる記述
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      //openとは、どのようなリクエストをするのかを指定するメソッド。第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをbooleanで記述
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        //onloadとは、レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
        if (XHR.status != 200){//HTTPステータスコードが200以外の場合
          //レスポンスがエラーとは、レスポンスのステータスコードが200以外だった場合
          alert(`Error ${XHR.satus}: ${XHR.statusText}`);
          //XHR.statusTextによって、エラーが生じたオブジェクトに含まれるエラーメッセージが表示
          return null;
          //return null;によってJavaScriptの処理から抜け出す
          //これはエラーが出た場合に、下記コード以降に記述されている処理を行わないようにすることが目的
        }
        const item = XHR.response.post;
        //XHR.responseでレスポンスされてきたJSONにアクセスできる
        if (item.checked === true){
          //checkedアクションで返却したitemは、XHR.response.postで取得
          post.setAttribute("data-check", "true");
          //既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセット
        } else if (item.checked === false){
          post.removeAttribute("data-check");
          //未読であればdata-checkは属性ごと削除
        }
      };
    });
  });
}
setInterval(check, 1000);
//setIntervalとは、一定の間隔（時間）ごとに指定した関数などを実行できるメソッドです。
//第一引数に実行する関数を指定し、第二引数に時間（ミリ秒）を指定

//ページを読み込んだらcheckを実行する」のではなく、「一定の時間ごとに、自動でcheckを実行する」仕様に変更
//windowからsetIntervalへ変更している