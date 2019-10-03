
	window.onload = function() {
		
		var canvas = document.getElementById('mycanvas');
		var dlLink = document.getElementById('download_link');
		
		<!--ファイル名-->
		var name = 'dlpaint.png';
		
		<!--canvas対応時のみ描画スクリプト起動-->
		if (canvas.getContext){
			var ctx = canvas.getContext('2d');
		}
		
		<!--描画設定-->
		var drawing = false;
		var before_x = 0;
		var before_y = 0;
		
		<!--マウスを動かした時の動作-->
		canvas.addEventListener('mousemove', draw_canvas);
		
		<!--マウスがクリックされている時の動作-->
		canvas.addEventListener('mousedown', function(e) {
			drawing = true;
			var rect = e.target.getBoundingClientRect();
			before_x = e.clientX - rect.left;
			before_y = e.clientY - rect.top;
		});
		
		<!--マウスがクリックをやめた時の動作-->
		canvas.addEventListener('mouseup', function() {
			drawing = false;
		});
		
		<!--canvasの描画設定-->
		function draw_canvas(e) {
			
			<!--クリック時のみ描画されるように設定-->
			if(!drawing) {
				reuturn
			};
			
			<!--マウス位置の代入-->
			var rect = e.target.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			
			<!--ライン・キャップ・スタイルの指定(butt,round,square)-->
			var LineStyle = document.getElementById('lineCapStyle').value;
			ctx.lineCap = LineStyle;
			
			<!--使う色・スタイルの指定-->
			var color = document.getElementById('color').value;
			ctx.strokeStyle = color;
			
			<!--線の太さ設定-->
			var w = document.getElementById('width').value;
			ctx.lineWidth = w;
			
			<!--現在のパスの初期化-->
			ctx.beginPath();
			
			<!--指定地点で新規サブパスを生成-->
			ctx.moveTo(before_x, before_y);
			
			<!--サブパスから現在のパスへ直線を結ぶ-->>
			ctx.lineTo(x, y);
			
			<!--現在のストロークスタイルでサブパスに線を引く-->
			ctx.stroke();
			
			<!--サブパスを閉じる-->
			ctx.closePath();
			
			before_x = x;
			before_y = y;
		};
		
		
		<!--キャンパスの初期化-->
		document.getElementById('clearBtn').addEventListener('click', function() {
		
		ret = confirm('キャンバスの内容を初期化します。')
		
			if(ret == true){
				ctx.clearRect(0,0,canvas.width, canvas.height);
			}
		});
	
		<!--キャンパスの塗りつぶし-->
		document.getElementById('paintClearBtn').addEventListener('click', function() {
		ctx.fillStyle = document.getElementById('paintClear').value;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		});
		
		<!--キャンバスの保存-->
		document.getElementById('dlBtn').addEventListener('click', function() {
			
			if (window.navigator.msSaveBlob) {
			
				<!--IEで保存する場合-->
				if(ret == true)
				var blob = canvas.msToBlob();
				window.navigator.msSaveBlob(blob, name);
				
			} else {
			
				<!-- chome・Opelraで保存する場合(その他対応可と思われるが未確認) -->
				ret = confirm('キャンバスの内容を保存します。')
				
				if(ret == true){
					dlLink.href = canvas.toDataURL('image/png');
					dlLink.download = name;
 					dlLink.click();
				}
			
			}
		});
		
		<!-- 画像の読み込み -->
		document.getElementById('uploadFile').addEventListener('change', function(e) {
			var fileData = e.target.files[0];
			var reader = new FileReader();
			
			<!-- キャンバス内のデータをクリア -->>
			reader.onload = function() {
				ctx.clearRect(0,0,canvas.width,canvas.height);
				var img = new Image();
				img.src = reader.result;
				
			<!-- 画像をキャンバスの枠内に収めて貼り付け(圧縮未実装のため) -->
				img.onload = function() {
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				}
			};
			
			reader.readAsDataURL(fileData);
		});
		
		document.getElementById('uploadFile').addEventListener('click', function(e) {
			document.getElementById('uploadFile').value = "";
		});
		
	}

